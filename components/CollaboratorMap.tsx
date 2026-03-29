'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'

/* ─────────────────────── Types ─────────────────────── */
interface RawArtist {
  name: string
  nameHindi?: string
  knownRoles: string[]
  activePeriod: string
}

interface RawSong {
  id: string
  title: string
  titleHindi?: string
  film: string
  year: number
  contributors: { artistId: string; role: string }[]
  hasDaastaan: boolean
  daastaanSlug?: string
}

export interface CollaborationsData {
  artists: Record<string, RawArtist>
  songs: RawSong[]
}

interface GraphNode {
  id: string
  name: string
  nameHindi?: string
  primaryRole: string
  songCount: number
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
  vx?: number
  vy?: number
}

interface SharedSong {
  id: string
  title: string
  film: string
  year: number
  sourceRole: string
  targetRole: string
  hasDaastaan: boolean
  daastaanSlug?: string
}

interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  songs: SharedSong[]
  count: number
}

interface ArtistSong {
  id: string
  title: string
  film: string
  year: number
  role: string
  hasDaastaan: boolean
  daastaanSlug?: string
}

/* ─────────────────────── Constants ─────────────────────── */
const ROLE_COLORS: Record<string, string> = {
  'music-director': '#E8A838',
  'singer':         '#E07070',
  'lyricist':       '#5B7FD4',
  'actor':          '#8E6CC4',
  'director':       '#4CAF91',
}

const ROLE_LABELS: Record<string, string> = {
  'music-director': 'Music Director',
  'singer':         'Singer',
  'lyricist':       'Lyricist',
  'actor':          'Actor',
  'director':       'Director',
}

const DECADES = [
  { label: 'All Time',  value: null,  end: null },
  { label: '1940–59',   value: 1940,  end: 1960 },
  { label: '1960s',     value: 1960,  end: 1970 },
  { label: '1970s',     value: 1970,  end: 1980 },
  { label: '1980s',     value: 1980,  end: 1990 },
  { label: '1990s+',    value: 1990,  end: 2030 },
]

/* ─────────────────────── Helper ─────────────────────── */
function getLinkKey(l: GraphLink): string {
  const src = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id
  const tgt = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id
  return src < tgt ? `${src}--${tgt}` : `${tgt}--${src}`
}

function nodeId(n: string | GraphNode): string {
  return typeof n === 'string' ? n : n.id
}

/* ─────────────────────── Component ─────────────────────── */
export default function CollaboratorMap({ data }: { data: CollaborationsData }) {
  const svgRef      = useRef<SVGSVGElement>(null)
  const tooltipRef  = useRef<HTMLDivElement>(null)
  const prevPosRef  = useRef<Record<string, { x: number; y: number }>>({})

  const [decade,          setDecade         ] = useState<number | null>(null)
  const [selectedArtist,  setSelectedArtist ] = useState<string | null>(null)
  const [selectedLinkKey, setSelectedLinkKey] = useState<string | null>(null)
  const [compareMode,     setCompareMode    ] = useState(false)
  const [compareIds,      setCompareIds     ] = useState<string[]>([])

  /* ── Graph data (recomputed on decade change) ── */
  const { nodes, links } = useMemo<{ nodes: GraphNode[]; links: GraphLink[] }>(() => {
    const dec = DECADES.find(d => d.value === decade)
    const songs = decade !== null
      ? data.songs.filter(s => dec && s.year >= dec.value! && s.year < dec.end!)
      : data.songs

    const songCount: Record<string, number> = {}
    songs.forEach(s => s.contributors.forEach(c => {
      songCount[c.artistId] = (songCount[c.artistId] || 0) + 1
    }))

    const nodes: GraphNode[] = Object.entries(songCount)
      .filter(([id]) => data.artists[id])
      .map(([id, count]) => {
        const prev = prevPosRef.current[id]
        return {
          id,
          name:        data.artists[id].name,
          nameHindi:   data.artists[id].nameHindi,
          primaryRole: data.artists[id].knownRoles[0],
          songCount:   count,
          x: prev?.x,
          y: prev?.y,
        }
      })

    const linkMap: Record<string, GraphLink> = {}
    songs.forEach(song => {
      const contribs = song.contributors.filter(c => songCount[c.artistId])
      for (let i = 0; i < contribs.length; i++) {
        for (let j = i + 1; j < contribs.length; j++) {
          const a = contribs[i].artistId
          const b = contribs[j].artistId
          if (a === b) continue
          const [src, tgt] = a < b ? [a, b] : [b, a]
          const key = `${src}--${tgt}`
          if (!linkMap[key]) linkMap[key] = { source: src, target: tgt, songs: [], count: 0 }
          if (!linkMap[key].songs.find(s => s.id === song.id)) {
            const sc = contribs.find(c => c.artistId === src)!
            const tc = contribs.find(c => c.artistId === tgt)!
            linkMap[key].songs.push({
              id: song.id, title: song.title, film: song.film, year: song.year,
              sourceRole: sc.role, targetRole: tc.role,
              hasDaastaan: song.hasDaastaan, daastaanSlug: song.daastaanSlug,
            })
            linkMap[key].count++
          }
        }
      }
    })

    return { nodes, links: Object.values(linkMap) }
  }, [data, decade])

  /* ── Compare highlight key ── */
  const compareKey = useMemo(() => {
    if (compareIds.length !== 2) return null
    const [a, b] = compareIds
    return a < b ? `${a}--${b}` : `${b}--${a}`
  }, [compareIds])

  const compareLink = useMemo(() => {
    if (!compareKey) return null
    return links.find(l => getLinkKey(l) === compareKey) ?? null
  }, [compareKey, links])

  /* ── Selected artist's songs ── */
  const artistSongs = useMemo<ArtistSong[]>(() => {
    if (!selectedArtist) return []
    const dec = DECADES.find(d => d.value === decade)
    return data.songs
      .filter(s => {
        const inEra = decade !== null ? dec && s.year >= dec.value! && s.year < dec.end! : true
        return inEra && s.contributors.some(c => c.artistId === selectedArtist)
      })
      .map(s => ({
        id: s.id, title: s.title, film: s.film, year: s.year,
        role: s.contributors.find(c => c.artistId === selectedArtist)?.role ?? '',
        hasDaastaan: s.hasDaastaan, daastaanSlug: s.daastaanSlug,
      }))
      .sort((a, b) => a.year - b.year)
  }, [selectedArtist, data, decade])

  /* ── Selected link ── */
  const selLink = useMemo(() => {
    if (!selectedLinkKey) return null
    return links.find(l => getLinkKey(l) === selectedLinkKey) ?? null
  }, [selectedLinkKey, links])

  const selLinkArtists = useMemo(() => {
    if (!selLink) return null
    const src = nodeId(selLink.source)
    const tgt = nodeId(selLink.target)
    return { src, tgt, srcArtist: data.artists[src], tgtArtist: data.artists[tgt] }
  }, [selLink, data])

  /* ── D3 force graph ── */
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return
    let cancelled = false
    let stopSim = () => {}

    import('d3').then(d3 => {
      if (cancelled || !svgRef.current) return

      const svg = d3.select(svgRef.current)
      svg.selectAll('*').remove()

      const W = svgRef.current.clientWidth  || 800
      const H = svgRef.current.clientHeight || 600

      const rScale = d3.scaleSqrt()
        .domain([1, Math.max(...nodes.map(n => n.songCount), 2)])
        .range([10, 26])

      const wScale = d3.scaleLinear()
        .domain([1, Math.max(...links.map(l => l.count), 2)])
        .range([1.5, 5])

      /* Zoom */
      const g = svg.append('g')
      svg.call(
        d3.zoom<SVGSVGElement, unknown>()
          .scaleExtent([0.25, 4])
          .on('zoom', e => g.attr('transform', e.transform))
      )
      svg.on('click', () => {
        setSelectedArtist(null)
        setSelectedLinkKey(null)
      })

      /* Links */
      const linkSel = g.append('g').selectAll<SVGLineElement, GraphLink>('line')
        .data(links)
        .join('line')
        .attr('stroke', 'var(--divide)')
        .attr('stroke-opacity', 0.55)
        .attr('stroke-width', l => wScale(l.count))
        .style('cursor', 'pointer')
        .on('click', (event, l) => {
          event.stopPropagation()
          const key = getLinkKey(l)
          setSelectedLinkKey(prev => prev === key ? null : key)
          setSelectedArtist(null)
        })

      /* Nodes */
      const nodeSel = g.append('g').selectAll<SVGGElement, GraphNode>('g')
        .data(nodes, d => d.id)
        .join('g')
        .style('cursor', 'pointer')

      nodeSel.append('circle')
        .attr('r', n => rScale(n.songCount))
        .attr('fill', n => ROLE_COLORS[n.primaryRole] || '#888')
        .attr('fill-opacity', 0.85)
        .attr('stroke', 'none')

      nodeSel.append('text')
        .text(n => n.name.split(' ').slice(0, 2).join('\u00A0'))
        .attr('text-anchor', 'middle')
        .attr('dy', n => rScale(n.songCount) + 13)
        .attr('font-size', '10')
        .attr('font-family', 'var(--font-jost, sans-serif)')
        .attr('fill', 'var(--ink3)')
        .attr('pointer-events', 'none')

      /* Tooltip */
      const tt = tooltipRef.current
      nodeSel
        .on('click', (event, n) => {
          event.stopPropagation()
          if (compareMode) {
            setCompareIds(prev => {
              if (prev.includes(n.id)) return prev.filter(id => id !== n.id)
              if (prev.length >= 2) return [prev[1], n.id]
              return [...prev, n.id]
            })
          } else {
            setSelectedArtist(prev => prev === n.id ? null : n.id)
            setSelectedLinkKey(null)
          }
        })
        .on('mouseenter', (event, n) => {
          if (!tt) return
          const color = ROLE_COLORS[n.primaryRole] || '#888'
          tt.innerHTML = `<strong>${n.name}</strong><br/><span style="color:${color}">${ROLE_LABELS[n.primaryRole] || n.primaryRole}</span><br/>${n.songCount} song${n.songCount !== 1 ? 's' : ''}`
          tt.style.display = 'block'
        })
        .on('mousemove', event => {
          if (!tt || !svgRef.current) return
          const rect = svgRef.current.getBoundingClientRect()
          tt.style.left = (event.clientX - rect.left + 14) + 'px'
          tt.style.top  = (event.clientY - rect.top  - 36) + 'px'
        })
        .on('mouseleave', () => { if (tt) tt.style.display = 'none' })

      /* Drag */
      nodeSel.call(
        d3.drag<SVGGElement, GraphNode>()
          .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
          .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y })
          .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null })
      )

      /* Simulation */
      const sim = d3.forceSimulation<GraphNode>(nodes)
        .force('link', d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(l => 90 + l.count * 12).strength(0.55))
        .force('charge', d3.forceManyBody().strength(-320))
        .force('center', d3.forceCenter(W / 2, H / 2))
        .force('collide', d3.forceCollide<GraphNode>(n => rScale(n.songCount) + 10))
        .on('tick', () => {
          linkSel
            .attr('x1', l => (l.source as GraphNode).x ?? 0)
            .attr('y1', l => (l.source as GraphNode).y ?? 0)
            .attr('x2', l => (l.target as GraphNode).x ?? 0)
            .attr('y2', l => (l.target as GraphNode).y ?? 0)
          nodeSel.attr('transform', n => `translate(${n.x ?? 0},${n.y ?? 0})`)
          nodes.forEach(n => { if (n.x) prevPosRef.current[n.id] = { x: n.x, y: n.y! } })
        })

      stopSim = () => sim.stop()
    })

    return () => { cancelled = true; stopSim() }
  }, [nodes, links, compareMode]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Update visual styles when selection changes (without rebuilding sim) ── */
  useEffect(() => {
    if (!svgRef.current) return
    import('d3').then(d3 => {
      if (!svgRef.current) return
      const svg = d3.select(svgRef.current)

      svg.selectAll<SVGLineElement, GraphLink>('.links line, g > g > line').each(function(l) {
        // fallback — styles updated via attr below
      })

      svg.selectAll<SVGLineElement, GraphLink>('line').attr('stroke', function(l) {
        if (!l) return 'var(--divide)'
        const key = getLinkKey(l)
        if (compareKey && key === compareKey)    return 'var(--accent)'
        if (selectedArtist) {
          const s = nodeId(l.source), t = nodeId(l.target)
          if (s === selectedArtist || t === selectedArtist) return 'var(--accent)'
        }
        return 'var(--divide)'
      }).attr('stroke-opacity', function(l) {
        if (!l) return 0.55
        const key = getLinkKey(l)
        if (compareKey) return key === compareKey ? 1 : 0.08
        if (selectedArtist) {
          const s = nodeId(l.source), t = nodeId(l.target)
          return (s === selectedArtist || t === selectedArtist) ? 0.8 : 0.12
        }
        return 0.55
      }).attr('stroke-width', function(l) {
        if (!l) return 1.5
        const key = getLinkKey(l)
        if (compareKey && key === compareKey) return 4
        return Math.max(1.5, l.count * 1.2)
      })

      svg.selectAll<SVGCircleElement, GraphNode>('circle').attr('fill-opacity', function(n) {
        if (!n) return 0.85
        if (compareKey) return compareIds.includes(n.id) ? 1 : 0.25
        if (selectedArtist) {
          if (n.id === selectedArtist) return 1
          const conn = links.some(l => {
            const s = nodeId(l.source), t = nodeId(l.target)
            return (s === selectedArtist && t === n.id) || (t === selectedArtist && s === n.id)
          })
          return conn ? 0.75 : 0.18
        }
        return 0.85
      }).attr('stroke', function(n) {
        if (!n) return 'none'
        if (compareIds.includes(n.id)) return 'var(--accent)'
        if (n.id === selectedArtist) return 'var(--ink)'
        return 'none'
      }).attr('stroke-width', function(n) {
        if (!n) return 0
        return (compareIds.includes(n.id) || n.id === selectedArtist) ? 2.5 : 0
      })
    })
  }, [selectedArtist, selectedLinkKey, compareKey, compareIds, nodes, links])

  /* ─────────────── Render ─────────────── */
  const showPanel = selectedArtist || (compareMode && compareIds.length > 0) || selLink

  return (
    <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 61px)', minHeight: 560 }}>

      {/* ── Controls sidebar ── */}
      <aside
        className="lg:w-60 flex-shrink-0 flex flex-col gap-5 p-5 overflow-y-auto"
        style={{ background: 'var(--bg2)', borderRight: '1px solid var(--divide)' }}
      >
        <div>
          <h1 className="font-display font-bold text-[1.05rem] mb-1" style={{ color: 'var(--ink)' }}>
            Collaborator Map
          </h1>
          <p className="font-body text-[0.77rem] leading-relaxed" style={{ color: 'var(--ink3)' }}>
            Decades of Hindi cinema's creative web. Click an artist or a connection to explore.
          </p>
        </div>

        {/* Era filter */}
        <div>
          <p className="font-sans text-[0.6rem] tracking-[.15em] uppercase mb-2" style={{ color: 'var(--ink4)' }}>
            Filter by Era
          </p>
          <div className="flex flex-wrap gap-1.5">
            {DECADES.map(d => (
              <button
                key={String(d.value)}
                onClick={() => { setDecade(d.value); setSelectedArtist(null); setSelectedLinkKey(null) }}
                className="font-sans text-[0.65rem] tracking-[.06em] px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: decade === d.value ? 'var(--accent)' : 'var(--card)',
                  color:      decade === d.value ? '#fff' : 'var(--ink3)',
                  border:     `1px solid ${decade === d.value ? 'var(--accent)' : 'var(--divide)'}`,
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div>
          <p className="font-sans text-[0.6rem] tracking-[.15em] uppercase mb-2" style={{ color: 'var(--ink4)' }}>
            Role Legend
          </p>
          <div className="flex flex-col gap-1.5">
            {Object.entries(ROLE_LABELS).map(([role, label]) => (
              <div key={role} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ROLE_COLORS[role] }} />
                <span className="font-sans text-[0.7rem]" style={{ color: 'var(--ink2)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compare mode */}
        <div>
          <button
            onClick={() => { setCompareMode(p => !p); setCompareIds([]); setSelectedArtist(null); setSelectedLinkKey(null) }}
            className="w-full font-sans text-[0.7rem] tracking-[.06em] uppercase py-2.5 px-3 rounded-lg transition-all"
            style={{
              background: compareMode ? 'var(--accent)' : 'var(--card)',
              color:      compareMode ? '#fff' : 'var(--ink3)',
              border:     `1px solid ${compareMode ? 'var(--accent)' : 'var(--divide)'}`,
            }}
          >
            {compareMode ? '× Exit Compare' : '⇌ Compare Artists'}
          </button>
          {compareMode && (
            <p className="font-body italic text-[0.7rem] mt-2 leading-snug" style={{ color: 'var(--ink4)' }}>
              {compareIds.length === 0 && 'Click two artists on the map.'}
              {compareIds.length === 1 && `"${data.artists[compareIds[0]]?.name}" — pick one more.`}
              {compareIds.length === 2 && `Comparing ${data.artists[compareIds[0]]?.name.split(' ')[0]} & ${data.artists[compareIds[1]]?.name.split(' ')[0]}`}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="mt-auto pt-2" style={{ borderTop: '1px solid var(--divide)' }}>
          <p className="font-sans text-[0.65rem]" style={{ color: 'var(--ink3)' }}>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{nodes.length}</span> artists ·{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{links.length}</span> connections
          </p>
          <p className="font-sans text-[0.6rem] mt-1" style={{ color: 'var(--ink4)' }}>
            Scroll to zoom · drag to reposition
          </p>
        </div>
      </aside>

      {/* ── Graph canvas ── */}
      <div className="flex-1 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
        {/* Tooltip */}
        <div
          ref={tooltipRef}
          style={{
            display: 'none', position: 'absolute', pointerEvents: 'none', zIndex: 20,
            background: 'var(--card)', border: '1px solid var(--divide)',
            borderRadius: 8, padding: '7px 12px', fontSize: '0.75rem',
            color: 'var(--ink)', lineHeight: 1.55,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        />
        <svg
          ref={svgRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-body italic" style={{ color: 'var(--ink4)' }}>No collaborations found for this era.</p>
          </div>
        )}
      </div>

      {/* ── Info panel ── */}
      {showPanel && (
        <aside
          className="lg:w-72 flex-shrink-0 p-5 overflow-y-auto"
          style={{
            background: 'var(--bg2)',
            borderLeft: '1px solid var(--divide)',
            borderTop: '1px solid var(--divide)',
          }}
        >
          {/* ─ Artist detail ─ */}
          {selectedArtist && !compareMode && data.artists[selectedArtist] && (
            <div>
              <button
                onClick={() => setSelectedArtist(null)}
                className="font-sans text-[0.6rem] tracking-[.1em] uppercase mb-4"
                style={{ color: 'var(--ink4)' }}
              >
                ← Back
              </button>
              <span
                className="inline-block font-sans text-[0.6rem] tracking-[.12em] uppercase px-2 py-1 rounded-full mb-3"
                style={{
                  background: `${ROLE_COLORS[data.artists[selectedArtist].knownRoles[0]] || '#888'}22`,
                  color: ROLE_COLORS[data.artists[selectedArtist].knownRoles[0]] || '#888',
                }}
              >
                {ROLE_LABELS[data.artists[selectedArtist].knownRoles[0]] || data.artists[selectedArtist].knownRoles[0]}
              </span>
              <h2 className="font-display font-bold text-[1.1rem] mb-0.5 leading-tight" style={{ color: 'var(--ink)' }}>
                {data.artists[selectedArtist].name}
              </h2>
              {data.artists[selectedArtist].nameHindi && (
                <p className="font-body italic text-[0.88rem] mb-1" style={{ color: 'var(--ink3)' }}>
                  {data.artists[selectedArtist].nameHindi}
                </p>
              )}
              <p className="font-sans text-[0.65rem] tracking-[.06em] mb-4" style={{ color: 'var(--ink4)' }}>
                Active {data.artists[selectedArtist].activePeriod}
              </p>

              <p className="font-sans text-[0.6rem] tracking-[.14em] uppercase mb-2" style={{ color: 'var(--ink4)' }}>
                Songs in this view
              </p>
              <div className="flex flex-col gap-2">
                {artistSongs.map(song => (
                  <SongCard key={song.id} song={song} showRole />
                ))}
              </div>
            </div>
          )}

          {/* ─ Compare result ─ */}
          {compareMode && compareIds.length > 0 && (
            <div>
              <p className="font-sans text-[0.6rem] tracking-[.14em] uppercase mb-3" style={{ color: 'var(--ink4)' }}>
                Comparing
              </p>
              <div className="flex gap-2 mb-4">
                {compareIds.map(id => (
                  <div
                    key={id}
                    className="flex-1 p-2.5 rounded-lg text-center"
                    style={{ background: 'var(--card)', border: '1px solid var(--accent)' }}
                  >
                    <p className="font-sans text-[0.7rem] font-medium leading-tight" style={{ color: 'var(--ink)' }}>
                      {data.artists[id]?.name}
                    </p>
                    <p className="font-sans text-[0.6rem] mt-0.5" style={{ color: `${ROLE_COLORS[data.artists[id]?.knownRoles[0]]}` }}>
                      {ROLE_LABELS[data.artists[id]?.knownRoles[0]] || data.artists[id]?.knownRoles[0]}
                    </p>
                  </div>
                ))}
              </div>

              {compareIds.length === 2 && (
                compareLink ? (
                  <>
                    <p className="font-sans text-[0.65rem] mb-3" style={{ color: 'var(--ink3)' }}>
                      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{compareLink.count}</span> shared song{compareLink.count !== 1 ? 's' : ''}
                    </p>
                    <div className="flex flex-col gap-2">
                      {compareLink.songs.sort((a, b) => a.year - b.year).map(song => (
                        <div
                          key={song.id}
                          className="p-2.5 rounded-lg"
                          style={{ background: 'var(--card)', border: '1px solid var(--divide)' }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-body text-[0.8rem] font-medium leading-tight truncate" style={{ color: 'var(--ink)' }}>
                                {song.title}
                              </p>
                              <p className="font-sans text-[0.63rem] mt-0.5" style={{ color: 'var(--ink4)' }}>
                                {song.film} · {song.year}
                              </p>
                              <div className="flex gap-1 mt-1.5 flex-wrap">
                                <RolePill role={song.sourceRole} />
                                <span style={{ color: 'var(--ink4)', fontSize: '0.6rem', alignSelf: 'center' }}>+</span>
                                <RolePill role={song.targetRole} />
                              </div>
                            </div>
                            {song.hasDaastaan && song.daastaanSlug && (
                              <Link href={`/story/${song.daastaanSlug}`} className="flex-shrink-0 font-sans text-[0.58rem] tracking-[.08em] uppercase px-2 py-1 rounded hover:opacity-75 transition-opacity" style={{ background: 'var(--accent)', color: '#fff' }}>
                                Read
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="font-body italic text-[0.82rem]" style={{ color: 'var(--ink4)' }}>
                    These two haven't collaborated in this era.
                  </p>
                )
              )}
            </div>
          )}

          {/* ─ Link detail ─ */}
          {selLink && selLinkArtists && !compareMode && !selectedArtist && (
            <div>
              <button
                onClick={() => setSelectedLinkKey(null)}
                className="font-sans text-[0.6rem] tracking-[.1em] uppercase mb-4"
                style={{ color: 'var(--ink4)' }}
              >
                ← Back
              </button>
              <h2 className="font-display font-bold text-[0.95rem] mb-1 leading-tight" style={{ color: 'var(--ink)' }}>
                {selLinkArtists.srcArtist?.name}
                <span className="font-body font-normal italic mx-1.5" style={{ color: 'var(--ink4)' }}>×</span>
                {selLinkArtists.tgtArtist?.name}
              </h2>
              <p className="font-sans text-[0.65rem] mb-4" style={{ color: 'var(--ink3)' }}>
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{selLink.count}</span> shared song{selLink.count !== 1 ? 's' : ''}
              </p>
              <div className="flex flex-col gap-2">
                {selLink.songs.sort((a, b) => a.year - b.year).map(song => (
                  <SongCard key={song.id} song={song} showRole={false} />
                ))}
              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  )
}

/* ─────────────────────── Sub-components ─────────────────────── */
function RolePill({ role }: { role: string }) {
  return (
    <span
      className="font-sans text-[0.58rem] tracking-[.08em] uppercase px-1.5 py-0.5 rounded"
      style={{
        background: `${ROLE_COLORS[role] || '#888'}22`,
        color: ROLE_COLORS[role] || '#888',
      }}
    >
      {ROLE_LABELS[role] || role}
    </span>
  )
}

function SongCard({ song, showRole }: { song: ArtistSong | SharedSong; showRole: boolean }) {
  const artistSong = song as ArtistSong
  return (
    <div
      className="p-2.5 rounded-lg"
      style={{ background: 'var(--card)', border: '1px solid var(--divide)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-body text-[0.8rem] font-medium leading-tight truncate" style={{ color: 'var(--ink)' }}>
            {song.title}
          </p>
          <p className="font-sans text-[0.63rem] mt-0.5" style={{ color: 'var(--ink4)' }}>
            {song.film} · {song.year}
          </p>
          {showRole && artistSong.role && (
            <div className="mt-1.5">
              <RolePill role={artistSong.role} />
            </div>
          )}
        </div>
        {song.hasDaastaan && song.daastaanSlug && (
          <Link
            href={`/story/${song.daastaanSlug}`}
            className="flex-shrink-0 font-sans text-[0.58rem] tracking-[.08em] uppercase px-2 py-1 rounded hover:opacity-75 transition-opacity"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Read
          </Link>
        )}
      </div>
    </div>
  )
}
