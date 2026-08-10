export type Grade = '9' | '10'

export type Subject = {
  key: string
  name: string
  textbook?: string
  notes?: string
  video?: string
  practical?: string
}

// Grammar books shared across both classes
const englishGrammar = {
  key: 'english-grammar',
  name: 'English Grammar',
  textbook:
    'https://drive.google.com/file/d/1SOthleP3bosiOobT5Zwbi0Ceq7J091pc/view?usp=drivesdk',
  video:
    'https://youtube.com/playlist?list=PLZy2vTiqUbUiw3SM-vawBpctHGyz-_NYn&si=fC0skrza4heBx5Oo',
}

const urduGrammar9 = {
  key: 'urdu-grammar',
  name: 'Urdu Grammar',
  textbook:
    'https://drive.google.com/file/d/18jrYqapYhunZykdWTX4Yl5js8RtCk2Bq/view?usp=drivesdk',
  video:
    'https://youtube.com/playlist?list=PLF_rOjfXl15IFXlAWUmV7eBVNFHwX1E_1&si=2Vvk37kpvooX7KEM',
}

const urduGrammar10 = {
  key: 'urdu-grammar',
  name: 'Urdu Grammar',
  textbook:
    'https://drive.google.com/file/d/18jrYqapYhunZykdWTX4Yl5js8RtCk2Bq/view?usp=drivesdk',
  video:
    'https://youtube.com/playlist?list=PLF_rOjfXl15J941hlHZ_mexPG7robVUOz&si=rPvDfYp0a2ve4xFe',
}

export const Subject: Record<Grade, Subject[]> = {
  '9': [
    {
      key: 'english',
      name: 'English',
      textbook:
        'https://drive.google.com/file/d/1mWBO-wzXqv0Oq9oazcjM-Y16EqmPqBtj/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/9/punjab-board/english',
      video:
        'https://youtube.com/playlist?list=PLv-EPn-tCZhsooIfiQ7BrhwictIoh1aXX&si=Sb36adYHpbLPbwBV',
    },
    {
      key: 'urdu',
      name: 'Urdu',
      textbook:
        'https://drive.google.com/file/d/1JPgnI_hL6D0EMPG36IdjcqB2OFBHLp52/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/9/punjab-board/urdu',
      video:
        'https://youtube.com/playlist?list=PL-0PQqyS6otmrfBm6F43Up19ZgCcoXfZj&si=pfAgPxRViRAbvlqM',
    },
    {
      key: 'islamiyat',
      name: 'Islamiyat',
      textbook:
        'https://drive.google.com/file/d/1kiaCqhXsXuuZ7HAAuXYfjl4_WaBf-ARS/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/9/punjab-board/islamiat',
      video:
        'https://youtube.com/playlist?list=PLmL4B3m4HFdlLGf0Je9cfiV4wdwKepT7_&si=WK3pFHF1XJKVuqR5',
    },
    {
      key: 'computer',
      name: 'Computer Science',
      textbook:
        'https://www.taleem360.com/9th-class-computer-science-new-snc-punjab-textbook-pdf',
      notes: 'https://maryamnotes.pk/9/punjab-board/computer-science',
      video:
        'https://youtube.com/playlist?list=PLqYMpw9p1cIofKjg7fFWvXy_ZyfdYawem&si=kfhM8FPl_WBKEFMN',
    },
    {
      key: 'biology',
      name: 'Biology',
      textbook:
        'https://drive.google.com/file/d/1rH5qC3FM12nPcH1zIVbm25tMKWxMv-3P/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/9/punjab-board/biology',
      video:
        'https://youtube.com/playlist?list=PLibnehEzlJhGyHIX6EdUipilyZW6ruWhZ&si=Db5NU_SBleinhZYf',
      practical: 'https://www.elearn.gov.pk/elearn_app/chapters/43',
    },
    {
      key: 'chemistry',
      name: 'Chemistry',
      textbook:
        'https://drive.google.com/file/d/1OY1Unpm8VkLCGQfbLFrE8wLn3fzXmZpc/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/9/punjab-board/chemistry',
      video:
        'https://youtube.com/playlist?list=PLt6MW398e3c_XUOb7SeT7jIJHMwAzqaI0&si=4LjfgtHn4GrA8cRO',
      practical: 'https://www.elearn.gov.pk/elearn_app/chapters/41',
    },
    {
      key: 'physics',
      name: 'Physics',
      textbook:
        'https://drive.google.com/file/d/14TEL4poDp5vvAP7JZ3dYXJ4U_9fPexm3/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/9/punjab-board/physics',
      video:
        'https://youtube.com/playlist?list=PLt6MW398e3c_Ny0HmmLFTEKg5BWNodLqU&si=TBVxMZyWsg7j1KyP',
      practical: 'https://www.elearn.gov.pk/elearn_app/chapters/39',
    },
    {
      key: 'maths',
      name: 'Maths',
      textbook:
        'https://drive.google.com/file/d/1IHxM96F221JY3uL4jEIRWQ8NxskXyilF/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/9/punjab-board/mathematics',
      video:
        'https://youtube.com/playlist?list=PL-xR7IhXrb4UBAUKmUtPf6Wmh-8eKkOfV&si=yjMb42QJb6Neflqs',
    },
    {
      key: 'tarjama',
      name: 'Tarjama Tul Quran',
      textbook:
        'https://drive.google.com/file/d/157EhLaNBr6h1XNrF6k2mflsdui9RfYaU/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/9/punjab-board/tarjama-tul-quran',
      video:
        'https://youtube.com/playlist?list=PLaJZ36gka1zzwLEhf352iSN5KzT_eSSxt&si=AI8R3ND0PpjgpQLG',
    },
    englishGrammar,
    urduGrammar9,
  ],
  '10': [
    {
      key: 'english',
      name: 'English',
      textbook:
        'https://drive.google.com/file/d/1-EsR1n2bFsiWTH7w9RAnyMqCb7PC-y-O/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/english',
      video:
        'https://youtube.com/playlist?list=PLt6MW398e3c8qqzqZRbppLDXw0QWOEL3M&si=H1-FKX94hCwHpPOA',
    },
    {
      key: 'urdu',
      name: 'Urdu',
      textbook:
        'https://drive.google.com/file/d/1kzhsY-mBWCYZGK8ETkh5DMwRFT0rFJzs/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/urdu',
      video:
        'https://youtube.com/playlist?list=PLmL4B3m4HFdl_B8EgrnxQ9a9UCzFFYf5K&si=1vVok0eDwjvJ3LeM',
    },
    {
      key: 'maths',
      name: 'Maths',
      textbook:
        'https://drive.google.com/file/d/1K61JCMrwFa0BT21Pd7p5JNvhthmJGtRD/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/mathematics',
      video:
        'https://youtube.com/playlist?list=PL-xR7IhXrb4VNUwNPM1iOliloffIp8R95&si=7NixG6pFQBqbkxQh',
    },
    {
      key: 'physics',
      name: 'Physics',
      textbook:
        'https://drive.google.com/file/d/1BaZO9VHwBsbwuE6pAUhMEmehl8DY9jMP/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/physics',
      video:
        'https://youtube.com/playlist?list=PLKCvOP47Hx1ERNjGvewIFLRssroZz0MmS&si=3oHOSAhu-n1TtvUC',
      practical: 'https://www.elearn.gov.pk/elearn_app/chapters/40',
    },
    {
      key: 'chemistry',
      name: 'Chemistry',
      textbook:
        'https://drive.google.com/file/d/142r9HIosiPteAb2BvlcqSxuOTx9KYqSr/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/chemistry',
      video:
        'https://youtube.com/playlist?list=PLbNHw8-qo1sTxVzfsHwcoMfMQOCwzkcje&si=kck5ipqelMOie3o3',
      practical: 'https://www.elearn.gov.pk/elearn_app/chapters/42',
    },
    {
      key: 'biology',
      name: 'Biology',
      textbook:
        'https://drive.google.com/file/d/1s_NARsLIqYSp2dz8_p7KMSLpYxeylYr4/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/biology',
      video: 'https://youtube.com/@word2wordlearningbiology?si=TJQWb8hESiibLLCD',
      practical: 'https://www.elearn.gov.pk/elearn_app/chapters/44',
    },
    {
      key: 'computer',
      name: 'Computer Science',
      textbook:
        'https://drive.google.com/file/d/1fzXU7lxWNtCjyleRvcgbA3hGwyfzqeyl/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/computer-science',
      video:
        'https://youtube.com/playlist?list=PLmL4B3m4HFdmfec_BQ_wRloUL6elk1qYd&si=_XWKYEjuD8wWPX71',
    },
    {
      key: 'pak-studies-urdu',
      name: 'Pak Studies (Urdu Medium)',
      textbook:
        'https://drive.google.com/file/d/1piyndlFhA-eUp6sXxap58yxF7Ocsi52x/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/pakistan-studies-urdu',
      video:
        'https://youtube.com/playlist?list=PLJQFEZm_fYcoKo5g8VnyHPklQRji77BCY&si=I7OJFvo1KdB8Bq3z',
    },
    {
      key: 'pak-studies-english',
      name: 'Pak Studies (English Medium)',
      textbook:
        'https://drive.google.com/file/d/18Ecfv-K0CgEzXFwgQxZCzCTQMq2yX1AE/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/pakistan-studies',
      video:
        'https://youtube.com/playlist?list=PLFMoOecKMF1s&si=CLwgvY-WUxdkh-GB',
    },
    {
      key: 'tarjama',
      name: 'Tarjama Tul Quran',
      textbook:
        'https://drive.google.com/file/d/1DMkY84-p4zsQbjKzyGcsTxIXsMGDxOeM/view?usp=drivesdk',
      notes: 'https://maryamnotes.pk/10/punjab-board/tarjama-tul-quran',
      video:
        'https://youtube.com/playlist?list=PLA18g2MFjFnk&si=J7N_sNSq3eMqN0Rh',
    },
    englishGrammar,
    urduGrammar10,
  ],
}

export function gradeLabel(grade: Grade) {
  return grade === '9' ? 'Matric Part 1 (9th Grade)' : 'Matric Part 2 (10th Grade)'
}

// Convert a Google Drive "view" link to a direct download link
export function toDownloadUrl(url: string) {
  const match = url.match(/\/file\/d\/([^/]+)\//)
  if (match) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`
  }
  return url
}
