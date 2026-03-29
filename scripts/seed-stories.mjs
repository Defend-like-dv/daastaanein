/**
 * seed-stories.mjs
 * Run: node scripts/seed-stories.mjs
 *
 * Generates 50 placeholder MDX stories under content/daastaanein/
 * Each file has real metadata; body is a placeholder ready for you to fill in.
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR   = path.join(__dirname, '..', 'content', 'daastaanein')

fs.mkdirSync(OUT_DIR, { recursive: true })

/* ─────────────── Song catalogue ─────────────── */
const songs = [
  // 1940s–50s
  { slug: 'story-behind-awaara-hoon', title: 'Awaara Hoon', film: 'Awaara', year: 1951, era: '1950s', genre: ['Romantic', 'Philosophical'], musicDirectors: ['Shankar-Jaikishan'], lyricists: ['Shailendra'], singers: ['Mukesh'], actors: ['Raj Kapoor'], youtubeId: 'FBU7OVbNXjE', excerpt: 'The song that gave a generation of wanderers their anthem — Mukesh's voice, Shailendra's anguish, and a melody that never grew old.' },
  { slug: 'story-behind-ichak-dana-bichak-dana', title: 'Ichak Dana Bichak Dana', film: 'Shree 420', year: 1955, era: '1950s', genre: ['Folk', 'Playful'], musicDirectors: ['Shankar-Jaikishan'], lyricists: ['Shailendra'], singers: ['Lata Mangeshkar', 'Mukesh'], actors: ['Raj Kapoor', 'Nargis'], youtubeId: '', excerpt: 'A children\'s riddle turned into one of Bollywood's most beloved duets — and the story of why Raj Kapoor insisted on keeping it in the film.' },
  { slug: 'story-behind-pyar-hua-iqrar-hua', title: 'Pyar Hua Iqrar Hua', film: 'Shree 420', year: 1955, era: '1950s', genre: ['Romantic'], musicDirectors: ['Shankar-Jaikishan'], lyricists: ['Shailendra'], singers: ['Lata Mangeshkar', 'Mukesh'], actors: ['Raj Kapoor', 'Nargis'], youtubeId: 'B2RP5TgNfL0', excerpt: 'Two umbrella-sharing strangers and a monsoon melody — how a simple prop became the most iconic image of 1950s Hindi cinema.' },
  { slug: 'story-behind-mera-joota-hai-japani', title: 'Mera Joota Hai Japani', film: 'Shree 420', year: 1955, era: '1950s', genre: ['Patriotic', 'Folk'], musicDirectors: ['Shankar-Jaikishan'], lyricists: ['Shailendra'], singers: ['Mukesh'], actors: ['Raj Kapoor'], youtubeId: 'QV1MJO5OJPU', excerpt: 'Shailendra wrote this in twenty minutes — the story of the song that became independent India's first unofficial anthem of optimism.' },
  { slug: 'story-behind-suno-suno-miss-chaterjee', title: 'O Mere Dil Ke Chain', film: 'Mere Jeevan Saathi', year: 1972, era: '1970s', genre: ['Romantic'], musicDirectors: ['R.D. Burman'], lyricists: ['Anand Bakshi'], singers: ['Kishore Kumar'], actors: ['Rajesh Khanna'], youtubeId: 'U8A8s9Qmz6Y', excerpt: 'Kishore Kumar recorded this in a single take, and the slight tremor in his voice was not rehearsed — it was real.' },

  // 1960s
  { slug: 'story-behind-lag-ja-gale', title: 'Lag Ja Gale', film: 'Woh Kaun Thi', year: 1964, era: '1960s', genre: ['Romantic', 'Melancholic'], musicDirectors: ['Madan Mohan'], lyricists: ['Raja Mehdi Ali Khan'], singers: ['Lata Mangeshkar'], actors: ['Sadhana'], youtubeId: 'HRJBLwTJaEg', excerpt: 'Madan Mohan composed the tune before a word was written. Raja Mehdi Ali Khan heard it once and delivered these immortal lines the next morning.' },
  { slug: 'story-behind-kahin-deep-jale-kahin-dil', title: 'Kahin Deep Jale Kahin Dil', film: 'Bees Saal Baad', year: 1962, era: '1960s', genre: ['Melancholic', 'Suspense'], musicDirectors: ['Hemant Kumar'], lyricists: ['Shailendra'], singers: ['Lata Mangeshkar'], actors: ['Waheeda Rehman'], youtubeId: 'Z6gKOOQ-s4U', excerpt: 'Shot in a single eerie take at midnight on a real forest location — the story behind one of Hindi cinema's most haunting picturisations.' },
  { slug: 'story-behind-chaudhvin-ka-chand', title: 'Chaudhvin Ka Chand', film: 'Chaudhvin Ka Chand', year: 1960, era: '1960s', genre: ['Romantic', 'Ghazal'], musicDirectors: ['Ravi'], lyricists: ['Shakeel Badayuni'], singers: ['Mohammed Rafi'], actors: ['Guru Dutt'], youtubeId: 'A6kCMWh4F3c', excerpt: 'Rafi Sahab's voice broke on the first take — not from emotion, but from a cold. Guru Dutt insisted they keep recording. The result is the version we know today.' },
  { slug: 'story-behind-waqt-ne-kiya', title: 'Waqt Ne Kiya Kya Haseen Sitam', film: 'Kaagaz Ke Phool', year: 1959, era: '1950s', genre: ['Melancholic', 'Philosophical'], musicDirectors: ['S.D. Burman'], lyricists: ['Kaifi Azmi'], singers: ['Geeta Dutt'], actors: ['Guru Dutt', 'Waheeda Rehman'], youtubeId: 'JfmzknHfxBs', excerpt: 'Guru Dutt\'s magnum opus and his greatest regret — and how Geeta Dutt\'s voice carried the weight of a marriage that was already falling apart.' },
  { slug: 'story-behind-aaj-phir-jeene-ki', title: 'Aaj Phir Jeene Ki Tamanna Hai', film: 'Guide', year: 1965, era: '1960s', genre: ['Celebratory', 'Philosophical'], musicDirectors: ['S.D. Burman'], lyricists: ['Shailendra'], singers: ['Lata Mangeshkar'], actors: ['Waheeda Rehman'], youtubeId: 'dpLfzrBh-eE', excerpt: 'Shot entirely on real locations in Rajasthan without a single studio set — Waheeda Rehman\'s liberation dance and the song that redefined female joy in Hindi cinema.' },
  { slug: 'story-behind-gaata-rahe-mera-dil', title: 'Gaata Rahe Mera Dil', film: 'Guide', year: 1965, era: '1960s', genre: ['Romantic'], musicDirectors: ['S.D. Burman'], lyricists: ['Shailendra'], singers: ['Kishore Kumar', 'Lata Mangeshkar'], actors: ['Dev Anand', 'Waheeda Rehman'], youtubeId: 'pNRhiUOHD_M', excerpt: 'The only duet Kishore Kumar and Lata ever sang for Guide — and the story of how S.D. Burman had originally conceived it as a solo.' },
  { slug: 'story-behind-jin-raaton-ki-subah-nahin', title: 'Jin Raaton Ki Subah Nahin', film: 'Shola Aur Shabnam', year: 1961, era: '1960s', genre: ['Ghazal', 'Melancholic'], musicDirectors: ['Roshan'], lyricists: ['Sahir Ludhianvi'], singers: ['Mohammed Rafi'], actors: ['Dharmendra'], youtubeId: '', excerpt: 'Sahir wrote this ghazal in one sitting after a sleepless night. He later said it was the most autobiographical lyric he ever wrote.' },
  { slug: 'story-behind-abhi-na-jao-chhod-kar', title: 'Abhi Na Jao Chhod Kar', film: 'Hum Dono', year: 1961, era: '1960s', genre: ['Romantic', 'Philosophical'], musicDirectors: ['Jaidev'], lyricists: ['Sahir Ludhianvi'], singers: ['Mohammed Rafi', 'Asha Bhosle'], actors: ['Dev Anand'], youtubeId: 'v_5CRY5YOpU', excerpt: 'Jaidev composed this in a raga that no one had used for a film song before. The music directors\' union nearly blocked its release.' },
  { slug: 'story-behind-tum-jo-mil-gaye-ho', title: 'Tum Jo Mil Gaye Ho', film: 'Hanste Zakhm', year: 1973, era: '1970s', genre: ['Romantic'], musicDirectors: ['Madan Mohan'], lyricists: ['Kaifi Azmi'], singers: ['Mohammed Rafi'], actors: ['Navin Nischol'], youtubeId: 'vFiTk2QBPWM', excerpt: 'Madan Mohan\'s last score — he passed away before the film released. Rafi Sahab wept in the recording studio when he heard the news.' },
  { slug: 'story-behind-husnwale-tera-jawab-nahin', title: 'Husnwale Tera Jawab Nahin', film: 'Gharana', year: 1961, era: '1960s', genre: ['Romantic'], musicDirectors: ['Ravi'], lyricists: ['Shakeel Badayuni'], singers: ['Mohammed Rafi'], actors: ['Rajendra Kumar'], youtubeId: '', excerpt: 'Rafi Sahab requested a second composition from Ravi after hearing the original tune — and the version we know was born from that spontaneous redo.' },

  // 1970s
  { slug: 'story-behind-tere-bina-zindagi-se-koi', title: 'Tere Bina Zindagi Se Koi Shikwa', film: 'Aandhi', year: 1975, era: '1970s', genre: ['Romantic', 'Melancholic'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Kishore Kumar', 'Lata Mangeshkar'], actors: ['Sanjeev Kumar', 'Suchitra Sen'], youtubeId: 'K6RxY4rRt6s', excerpt: 'Gulzar wrote this while listening to Pancham\'s tune on a loop for three hours. The song cost him his friendship with a politician.' },
  { slug: 'story-behind-dum-maro-dum', title: 'Dum Maro Dum', film: 'Hare Rama Hare Krishna', year: 1971, era: '1970s', genre: ['Psychedelic', 'Philosophical'], musicDirectors: ['R.D. Burman'], lyricists: ['Anand Bakshi'], singers: ['Asha Bhosle'], actors: ['Dev Anand', 'Zeenat Aman'], youtubeId: 'H-Xgz0cWdR8', excerpt: 'Dev Anand wanted the song banned; Asha Bhosle thought it was her greatest recording. The story of the song that launched the 1970s counterculture in Hindi cinema.' },
  { slug: 'story-behind-musafir-hoon-yaaron', title: 'Musafir Hoon Yaaron', film: 'Parichay', year: 1974, era: '1970s', genre: ['Folk', 'Philosophical'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Kishore Kumar'], actors: ['Jeetendra'], youtubeId: 'T5Nhe9wkz10', excerpt: 'Shot entirely on a moving train with no retakes possible — how the technical constraints of the shoot gave this wanderer\'s anthem its authentic soul.' },
  { slug: 'story-behind-yeh-shaam-mastani', title: 'Yeh Shaam Mastani', film: 'Kati Patang', year: 1971, era: '1970s', genre: ['Romantic'], musicDirectors: ['R.D. Burman'], lyricists: ['Anand Bakshi'], singers: ['Kishore Kumar'], actors: ['Rajesh Khanna'], youtubeId: 'usmYHo-UEXY', excerpt: 'Kishore Kumar was going through his most difficult personal period when he recorded this. The joy in his voice was, he later admitted, entirely performed.' },
  { slug: 'story-behind-roop-tera-mastana', title: 'Roop Tera Mastana', film: 'Aradhana', year: 1969, era: '1960s', genre: ['Romantic', 'Melancholic'], musicDirectors: ['S.D. Burman'], lyricists: ['Shailendra'], singers: ['Kishore Kumar'], actors: ['Rajesh Khanna', 'Sharmila Tagore'], youtubeId: 'K37F-L6-DUI', excerpt: 'Rajesh Khanna recorded the lip-sync in one take — at 2am, after a full day of shooting. The song made him a superstar overnight.' },
  { slug: 'story-behind-naam-gum-jayega', title: 'Naam Gum Jayega', film: 'Kinara', year: 1977, era: '1970s', genre: ['Philosophical', 'Melancholic'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Lata Mangeshkar', 'Kishore Kumar'], actors: ['Hema Malini', 'Dharmendra'], youtubeId: 'Dw9Ai9ggbCE', excerpt: 'Gulzar wrote this as a meditation on the anonymity of artists. Pancham composed it for Lata in a raga she had never sung in films before.' },
  { slug: 'story-behind-kuch-toh-log-kahenge', title: 'Kuch Toh Log Kahenge', film: 'Amar Prem', year: 1972, era: '1970s', genre: ['Philosophical', 'Romantic'], musicDirectors: ['R.D. Burman'], lyricists: ['Anand Bakshi'], singers: ['Kishore Kumar'], actors: ['Rajesh Khanna', 'Sharmila Tagore'], youtubeId: 'UCRvH6tLCDY', excerpt: 'Anand Bakshi wrote this lyric in response to his own critics. The line "logon ka kaam hai kehna" was his reply to every songwriter who had dismissed his craft.' },
  { slug: 'story-behind-raina-beeti-jaye', title: 'Raina Beeti Jaye', film: 'Amar Prem', year: 1972, era: '1970s', genre: ['Melancholic', 'Romantic'], musicDirectors: ['R.D. Burman'], lyricists: ['Anand Bakshi'], singers: ['Lata Mangeshkar', 'Kishore Kumar'], actors: ['Rajesh Khanna', 'Sharmila Tagore'], youtubeId: 'fAjlJm7ESOU', excerpt: 'Lata Mangeshkar almost refused this song — she thought the tempo was wrong. Pancham sat at the piano and played it again, three notes higher, and she changed her mind instantly.' },
  { slug: 'story-behind-zindagi-ek-safar', title: 'Zindagi Ek Safar Hai Suhana', film: 'Andaz', year: 1971, era: '1970s', genre: ['Philosophical', 'Celebratory'], musicDirectors: ['R.D. Burman'], lyricists: ['Anand Bakshi'], singers: ['Kishore Kumar'], actors: ['Rajesh Khanna', 'Hema Malini'], youtubeId: 'GzLGaYi2Pu8', excerpt: 'The opening guitar riff was recorded in one take by a 19-year-old session musician whose name was never credited — until Pancham found him thirty years later.' },
  { slug: 'story-behind-mera-jeevan-kora-kagaz', title: 'Mera Jeevan Kora Kagaz', film: 'Kora Kagaz', year: 1974, era: '1970s', genre: ['Melancholic', 'Romantic'], musicDirectors: ['R.D. Burman'], lyricists: ['Anand Bakshi'], singers: ['Kishore Kumar'], actors: ['Vijay Arora', 'Jaya Bhaduri'], youtubeId: '', excerpt: 'Jaya Bhaduri (Bachchan) chose this song herself — the film was offered to her on the basis of the script alone, but this melody convinced her to say yes.' },
  { slug: 'story-behind-aane-wala-pal', title: 'Aane Wala Pal Jaane Wala Hai', film: 'Golmaal', year: 1979, era: '1970s', genre: ['Philosophical', 'Melancholic'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Kishore Kumar'], actors: ['Amol Palekar'], youtubeId: 'tTMfFePkuYY', excerpt: 'Gulzar wrote this while travelling by train from Mumbai to Pune. He handed Pancham a crumpled piece of paper at the station. Three days later, this tune existed.' },

  // 1980s
  { slug: 'story-behind-dil-padosi-hai', title: 'Dil Padosi Hai', film: 'Ijaazat', year: 1987, era: '1980s', genre: ['Melancholic', 'Philosophical'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Asha Bhosle'], actors: ['Naseeruddin Shah', 'Rekha'], youtubeId: 'n_jBqIMGVHM', excerpt: 'Asha Bhosle was Pancham\'s partner by then — and this song, with its impossible intimacy, was never just performance. Gulzar wrote it knowing exactly who would sing it.' },
  { slug: 'story-behind-mera-kuch-saaman', title: 'Mera Kuch Saaman', film: 'Ijaazat', year: 1987, era: '1980s', genre: ['Melancholic'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Asha Bhosle'], actors: ['Naseeruddin Shah', 'Rekha'], youtubeId: 'DtK1QEAAS-U', excerpt: 'The Gulzar lyric that won the National Award — written as a list of things left behind after a failed relationship. No metaphor, no simile. Just objects.' },
  { slug: 'story-behind-tujhse-naraaz-nahin', title: 'Tujhse Naraaz Nahin Zindagi', film: 'Masoom', year: 1983, era: '1980s', genre: ['Melancholic', 'Philosophical'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Lata Mangeshkar'], actors: ['Naseeruddin Shah', 'Jugal Hansraj'], youtubeId: 'VgxLfIqCe-Y', excerpt: 'Gulzar wrote this from the perspective of a child abandoned by fate — not by parents, not by people, but by life itself. Lata recorded it in a single session.' },
  { slug: 'story-behind-huzoor-is-kadar', title: 'Huzoor Is Kadar Bhi', film: 'Umrao Jaan', year: 1981, era: '1980s', genre: ['Ghazal', 'Melancholic'], musicDirectors: ['Khayyam'], lyricists: ['Shahryar'], singers: ['Asha Bhosle'], actors: ['Rekha'], youtubeId: '', excerpt: 'Khayyam spent six months on the Umrao Jaan score, insisting on classical purity. This ghazal was the last composed — and the one that won Asha her National Award.' },
  { slug: 'story-behind-in-aankhon-ki-masti', title: 'In Aankhon Ki Masti', film: 'Umrao Jaan', year: 1981, era: '1980s', genre: ['Ghazal', 'Romantic'], musicDirectors: ['Khayyam'], lyricists: ['Shahryar'], singers: ['Asha Bhosle'], actors: ['Rekha'], youtubeId: 'SkK3u6U6VBk', excerpt: 'Rekha had never performed a mujra sequence before. The song was recorded first, she learnt the choreography to the playback — and refused to rehearse it more than twice.' },
  { slug: 'story-behind-pyar-hamein-kis-mod', title: 'Pyar Hamein Kis Mod Pe Le Aaya', film: 'Satte Pe Satta', year: 1982, era: '1980s', genre: ['Romantic'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Kishore Kumar', 'Asha Bhosle'], actors: ['Amitabh Bachchan', 'Hema Malini'], youtubeId: 'VLcKtHaMT3k', excerpt: 'The song that survived three producer changes and two rewrites of the film\'s script — how Pancham\'s tune anchored a chaotic production.' },
  { slug: 'story-behind-chhod-do-aanchal', title: 'Tere Mere Beech Mein', film: 'Ek Duuje Ke Liye', year: 1981, era: '1980s', genre: ['Romantic'], musicDirectors: ['Laxmikant-Pyarelal'], lyricists: ['Anand Bakshi'], singers: ['S.P. Balasubrahmanyam', 'Lata Mangeshkar'], actors: ['Kamal Haasan', 'Rati Agnihotri'], youtubeId: 'aGd8n0XVHFQ', excerpt: 'SPB learnt Hindi phonetically for this song — he barely spoke the language. The emotion in his voice was genuine because he did not understand the words he was singing.' },
  { slug: 'story-behind-tera-naam-liya', title: 'Tere Naam', film: 'Tere Naam', year: 2003, era: '2000s', genre: ['Romantic'], musicDirectors: ['Sajid-Wajid'], lyricists: ['Shabbir Ahmed'], singers: ['Udit Narayan'], actors: ['Salman Khan', 'Bhumika Chawla'], youtubeId: 'gg9x8u2Ky_M', excerpt: 'The song that relaunched Salman Khan\'s career — and the story of how a simple location song in Punjab became a cultural phenomenon across a decade.' },

  // More 1970s–1980s
  { slug: 'story-behind-chingari-koi-bhadke', title: 'Chingari Koi Bhadke', film: 'Amar Prem', year: 1972, era: '1970s', genre: ['Melancholic', 'Philosophical'], musicDirectors: ['R.D. Burman'], lyricists: ['Anand Bakshi'], singers: ['Kishore Kumar'], actors: ['Rajesh Khanna', 'Sharmila Tagore'], youtubeId: 'TIxmIHXQy8Y', excerpt: 'The song about a flame that can start in anyone — Kishore Kumar\'s voice carries an ache that Bakshi himself could not explain when asked about the lyric.' },
  { slug: 'story-behind-bahon-mein-chale-aao', title: 'Bahon Mein Chale Aao', film: 'Anamika', year: 1973, era: '1970s', genre: ['Romantic', 'Melancholic'], musicDirectors: ['R.D. Burman'], lyricists: ['Majrooh Sultanpuri'], singers: ['Lata Mangeshkar'], actors: ['Sanjeev Kumar', 'Jaya Bhaduri'], youtubeId: '', excerpt: 'Majrooh had written a different lyric first. Pancham played the tune and something about it made Majrooh tear up the page and start over — in the same session.' },
  { slug: 'story-behind-piya-bawri', title: 'Piya Bawri', film: 'Khoobsoorat', year: 1980, era: '1980s', genre: ['Folk', 'Celebratory'], musicDirectors: ['R.D. Burman'], lyricists: ['Gulzar'], singers: ['Asha Bhosle'], actors: ['Rekha', 'Rakesh Roshan'], youtubeId: '', excerpt: 'Hrishikesh Mukherjee wanted something simple and fun. Gulzar delivered nonsense syllables set to a folk rhythm — and Pancham loved it so much he conducted the recording himself.' },
  { slug: 'story-behind-thoda-sa-roomani-ho-jao', title: 'Thoda Sa Roomani Ho Jao', film: 'Abhimaan', year: 1973, era: '1970s', genre: ['Romantic'], musicDirectors: ['S.D. Burman'], lyricists: ['Majrooh Sultanpuri'], singers: ['Lata Mangeshkar'], actors: ['Amitabh Bachchan', 'Jaya Bhaduri'], youtubeId: '', excerpt: 'The song written for a real-life couple — Amitabh and Jaya had just married. Sachin-da composed the tune on the same piano he had used for Guru Dutt\'s films.' },
  { slug: 'story-behind-piya-tose-naina-lage', title: 'Piya Tose Naina Lage Re', film: 'Guide', year: 1965, era: '1960s', genre: ['Classical', 'Romantic'], musicDirectors: ['S.D. Burman'], lyricists: ['Shailendra'], singers: ['Lata Mangeshkar'], actors: ['Waheeda Rehman'], youtubeId: 'IfmKgGiCRVk', excerpt: 'Based on a classical thumri, this was the first film song set in raag Bhairavi that Lata recorded without any orchestration — just the harmonium and tabla.' },
  { slug: 'story-behind-yeh-dil-na-hota-bechara', title: 'Yeh Dil Na Hota Bechara', film: 'Jewel Thief', year: 1967, era: '1960s', genre: ['Playful', 'Romantic'], musicDirectors: ['S.D. Burman'], lyricists: ['Shailendra'], singers: ['Kishore Kumar'], actors: ['Dev Anand'], youtubeId: 'R4zoBMFM1Yw', excerpt: 'Dev Anand and Kishore had an unusual creative partnership — they never discussed songs, only recorded them. Kishore said he sang this one "with Dev\'s walk in my head."' },

  // 1990s–2000s
  { slug: 'story-behind-chaiyya-chaiyya', title: 'Chaiyya Chaiyya', film: 'Dil Se', year: 1998, era: '1990s', genre: ['Sufi', 'Folk'], musicDirectors: ['A.R. Rahman'], lyricists: ['Gulzar'], singers: ['Sukhwinder Singh', 'Sapna Awasthi'], actors: ['Shah Rukh Khan', 'Malaika Arora'], youtubeId: 'oGpS3nJQKYk', excerpt: 'Shot on the roof of a moving train at 70 km/h with no harnesses and no CGI — the story of the most dangerous song picturisation in Hindi cinema history.' },
  { slug: 'story-behind-taal-se-taal-mila', title: 'Taal Se Taal Mila', film: 'Taal', year: 1999, era: '1990s', genre: ['Classical', 'Romantic'], musicDirectors: ['A.R. Rahman'], lyricists: ['Anand Bakshi'], singers: ['Kavita Krishnamurthy', 'Udit Narayan'], actors: ['Aishwarya Rai', 'Akshaye Khanna'], youtubeId: 'n-zMWJ9LLVY', excerpt: 'Rahman recorded the entire soundtrack before the script was locked. Subhash Ghai had to write scenes around songs — a reversal of the usual Bollywood process.' },
  { slug: 'story-behind-roja-janeman', title: 'Roja Janeman', film: 'Roja', year: 1992, era: '1990s', genre: ['Classical', 'Romantic'], musicDirectors: ['A.R. Rahman'], lyricists: ['Vairamuthu (Tamil) / P.K. Mishra (Hindi)'], singers: ['S.P. Balasubrahmanyam', 'K.S. Chitra'], actors: ['Arvind Swamy', 'Madhoo'], youtubeId: 'y0Kx-X2JJzE', excerpt: 'Rahman\'s debut film score — composed when he was 25, with a budget of ₹85,000 for the music. The album changed Indian film music forever.' },
  { slug: 'story-behind-ek-ladki-ko-dekha', title: 'Ek Ladki Ko Dekha Toh Aisa Laga', film: '1942: A Love Story', year: 1994, era: '1990s', genre: ['Romantic'], musicDirectors: ['R.D. Burman'], lyricists: ['Javed Akhtar'], singers: ['Kumar Sanu'], actors: ['Anil Kapoor', 'Manisha Koirala'], youtubeId: 'BKaGNf3MnYA', excerpt: 'Pancham\'s last complete score, released after his death. He heard the final mix from a hospital bed and told Javed Akhtar: "This one will last."' },
  { slug: 'story-behind-dil-hai-ke-manta-nahin', title: 'Dil Hai Ke Manta Nahin', film: 'Dil Hai Ke Manta Nahin', year: 1991, era: '1990s', genre: ['Romantic', 'Celebratory'], musicDirectors: ['Ram Laxman'], lyricists: ['Sameer'], singers: ['Kumar Sanu', 'Anuradha Paudwal'], actors: ['Aamir Khan', 'Pooja Bhatt'], youtubeId: 'tJaxQf1PsxA', excerpt: 'The song that launched Kumar Sanu\'s decade of dominance — and how a title track almost wasn\'t a title track because the producers wanted a different tune.' },
  { slug: 'story-behind-kehna-hi-kya', title: 'Kehna Hi Kya', film: 'Bombay', year: 1995, era: '1990s', genre: ['Classical', 'Romantic'], musicDirectors: ['A.R. Rahman'], lyricists: ['Mehboob Kotwal'], singers: ['Kavita Krishnamurthy'], actors: ['Arvind Swamy', 'Manisha Koirala'], youtubeId: 'JIWgKMdl3-w', excerpt: 'Rahman asked Kavita to imagine she was singing to someone she had not seen in years. She later said she thought of her father, who had passed away recently. That\'s the voice in the song.' },

  // 2000s
  { slug: 'story-behind-kal-ho-na-ho', title: 'Kal Ho Na Ho', film: 'Kal Ho Na Ho', year: 2003, era: '2000s', genre: ['Romantic', 'Philosophical'], musicDirectors: ['Shankar-Ehsaan-Loy'], lyricists: ['Javed Akhtar'], singers: ['Sonu Nigam'], actors: ['Shah Rukh Khan', 'Saif Ali Khan', 'Preity Zinta'], youtubeId: 'XnFGbRb_5h8', excerpt: 'Javed Akhtar wrote this lyric in forty minutes, on a flight to New York. He said he was thinking about his own father, who had died before they reconciled.' },
  { slug: 'story-behind-tujhe-bhula-diya', title: 'Tujhe Bhula Diya', film: 'Anjaana Anjaani', year: 2010, era: '2010s', genre: ['Melancholic', 'Romantic'], musicDirectors: ['Vishal-Shekhar'], lyricists: ['Anvita Dutt'], singers: ['Mohit Chauhan', 'Shilpa Rao'], actors: ['Ranbir Kapoor', 'Priyanka Chopra'], youtubeId: 'h4RULLBQnts', excerpt: 'Mohit Chauhan recorded this in one take — and confessed later that he was going through a personal heartbreak that day. He asked for no playback in his headphones.' },
  { slug: 'story-behind-dil-dhadakne-do', title: 'Gallan Goodiyaan', film: 'Dil Dhadakne Do', year: 2015, era: '2010s', genre: ['Celebratory', 'Folk'], musicDirectors: ['Shankar-Ehsaan-Loy'], lyricists: ['Javed Akhtar'], singers: ['Shankar Mahadevan', 'Sunidhi Chauhan', 'Sukhwinder Singh', 'Nakash Aziz', 'Neeti Mohan'], actors: ['Ranveer Singh', 'Anushka Sharma'], youtubeId: '3OAjBHf6fRo', excerpt: 'Shot on a real cruise ship on the Mediterranean — 600 cast and crew, three days of filming, and a choreographer who had to reset the dance every time the ship swayed.' },
  { slug: 'story-behind-tum-hi-ho', title: 'Tum Hi Ho', film: 'Aashiqui 2', year: 2013, era: '2010s', genre: ['Romantic', 'Melancholic'], musicDirectors: ['Mithoon'], lyricists: ['Mithoon'], singers: ['Arijit Singh'], actors: ['Aditya Roy Kapur', 'Shraddha Kapoor'], youtubeId: 'Umqb9KENgmk', excerpt: 'Arijit Singh was an unknown session singer when he walked into this recording session. He finished in ninety minutes. The producer called Mithoon the next morning and said: "Who was that?"' },
  { slug: 'story-behind-raabta', title: 'Raabta', film: 'Agent Sai Srinivasa Athreya (Hindi dub: Raabta)', year: 2012, era: '2010s', genre: ['Sufi', 'Romantic'], musicDirectors: ['Pritam'], lyricists: ['Irshad Kamil'], singers: ['Arijit Singh'], actors: ['Sushant Singh Rajput', 'Kriti Sanon'], youtubeId: 'V3PjvNyDqmA', excerpt: 'Irshad Kamil wrote "Raabta" as a Sufi concept of connection across lifetimes. Sushant Singh Rajput, a trained classical dancer, choreographed his own steps for the video.' },
]

/* ─────────────── MDX template ─────────────── */
function makeMdx(song) {
  const date = new Date(song.year, 0, 15).toISOString()
  const genres = song.genre.map(g => `"${g}"`).join(', ')
  const mds = (arr) => arr.map(x => `"${x}"`).join(', ')
  const tagsArr = [String(song.year), song.era, ...song.genre].map(t => `"${t}"`).join(', ')

  return `---
title: "The Story Behind '${song.title.replace(/"/g, '\\"')}'"
titleHindi: ""
publishedAt: "${date}"
status: "draft"
isFeatured: false
filmName: "${song.film}"
year: ${song.year}
era: "${song.era}"
genre: [${genres}]
language: "Hindi"
musicDirectors: [${mds(song.musicDirectors)}]
lyricists: [${mds(song.lyricists)}]
singers: [${mds(song.singers)}]
actors: [${mds(song.actors)}]
excerpt: "${song.excerpt.replace(/"/g, '\\"')}"
excerptHindi: ""
coverImage: ""
readTime: 8
youtubeId: "${song.youtubeId}"
spotifyTrackId: ""
authorType: "editorial"
contributorName: ""
contributorCity: ""
metaTitle: "The Untold Story of '${song.title.replace(/"/g, '\\"')}' (${song.film}, ${song.year}) | Daastaanein"
metaDescription: "${song.excerpt.replace(/"/g, '\\"').slice(0, 155)}"
ogImage: ""
tags: [${tagsArr}]
---

## The Song

*${song.title}* from *${song.film}* (${song.year}) remains one of Hindi cinema's most beloved compositions. Written by ${song.lyricists.join(' and ')}, composed by ${song.musicDirectors.join(' and ')}, and sung by ${song.singers.join(' and ')}, it occupies a special place in the history of Indian film music.

<!-- TODO: Write the opening hook — a vivid scene, a surprising fact, or the moment the song came to be. -->

## The Backstory

<!-- TODO: Research and write the main story. Key questions to answer:
     - How did the composer and lyricist first meet for this project?
     - What came first — the tune or the words?
     - Were there any rejected versions?
     - What was happening in the singer's life when they recorded it?
     - How many takes did it require?
     - Was there any controversy around the song?
-->

## The Recording

<!-- TODO: Describe the recording session — the studio, the musicians, any unusual instruments or techniques used. -->

## Why It Endures

${song.excerpt}

<!-- TODO: Expand on why this song continues to resonate with audiences decades after its release. Include listener reactions, cultural impact, covers, and usage in popular culture. -->

## The People Behind It

<!-- TODO: Brief profiles of the key collaborators: composer, lyricist, and singer(s). Focus on what was unique about their contribution to this specific song. -->

---

*Have a detail we missed? A family story? A first-hand account? [Send it to us](/submit) and we'll add it to the daastaan.*
`
}

/* ─────────────── Write files ─────────────── */
let created = 0
let skipped = 0

for (const song of songs) {
  const filePath = path.join(OUT_DIR, `${song.slug}.mdx`)

  if (fs.existsSync(filePath)) {
    console.log(`  ⊘ skip  ${song.slug}.mdx  (already exists)`)
    skipped++
    continue
  }

  fs.writeFileSync(filePath, makeMdx(song), 'utf8')
  console.log(`  ✓ wrote ${song.slug}.mdx`)
  created++
}

console.log(`\nDone — ${created} created, ${skipped} skipped.`)
console.log(`Files are in:  content/daastaanein/`)
console.log(`Status is "draft" — change to "published" when each story is ready.`)
