/* cv-data.js — editable non-publication CV content.
 * Publication records are shared with the homepage and live only in
 * script/publications-data.js. */

window.CV_DATA = {

  /* --- Header (main.tex) ------------------------------------------------ */
  header: {
    name: "Youwang Kim",
    /* Current positions, shown right under the name. */
    position: "Research Intern at NVIDIA  ·  Ph.D. Student at POSTECH",
    /* Contact line; rendered in order, separated by "|". */
    links: [
      { label: "youwangk@nvidia.com", url: "mailto:youwangk@nvidia.com" },
      { label: "youwang.kim@postech.ac.kr", url: "mailto:youwang.kim@postech.ac.kr" },
      { label: "kim-youwang.github.io", url: "https://kim-youwang.github.io" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=gKXTrF8AAAAJ&hl=en" },
    ],
  },

  // Bio: tinted block under the header. **double asterisks** bold a phrase; null removes the block.
  bio: [
    "Youwang's research aims to build **photorealistic and interactive 3D/4D digital twins** for **content creation** and **physical AI**.",
    "Recently, his focus is on **generative neural materials**.",
  ],

  /* Front-page bullet summary. `label` bolds as the lead-in; **double asterisks**
   * inside `text` bold a phrase, same convention as `bio`. */
  summary: [
    {
      label: "Expertise",
      text: "Real-time graphics & 3D vision, Generative models, Neural rendering, Digital twins",
    },
    {
      label: "Publication",
      text: "**" + window.PUBLICATIONS_DB.items.length + " publications (" +
        window.PUBLICATIONS_DB.items.filter(function (publication) {
          return /^Kim Youwang(?:\*|,)/.test(publication.authors);
        }).length + " as 1st author)** in top conferences {CVPR, ECCV, ICLR, AAAI, etc}, journals {TPAMI, IJCV, TMLR, etc} and tech reports {NVIDIA, Meta}",
    },
    {
      label: "Industry / academia experience",
      text: "Research internships at **NVIDIA** (Real-Time Graphics Research) and **Meta** (Codec Avatars Lab); Visiting Ph.D. at **Univ. of Tübingen**",
    },
    // {
    //   label: "Patents & tech transfer",
    //   text: "**4 granted patents**; 1 licensed technology",
    // },
    {
      label: "Award",
      text: "Grand Prize / Minister's Award ($12K), ICT Paper Awards; Best Poster Award, BMVC 2024; Qualcomm Innovation Fellowship ($4K); Outstanding Reviewer Award, ICCV 2023 (top 1.89%)",
    },
    {
      label: "Academic activity",
      text: "**Reviewed ~50 papers** as reviewer for journals {TPAMI, IJCV, TOG, etc} and conferences {CVPR, ICCV, ECCV, NeurIPS, ACM SIGGRAPH & SIGGRAPH Asia, etc}",
    },
  ],

  /* Curated highlight reel derived from the shared publication database. */
  selectedPublications: window.PUBLICATIONS_DB.items
    .filter(function (publication) { return publication.cvHighlight; })
    .sort(function (a, b) { return a.cvHighlight.order - b.cvHighlight.order; })
    .map(function (publication) {
      return {
        title: publication.cvHighlight.title,
        url: publication.links[0] && publication.links[0].url,
        collab: publication.cvHighlight.collab,
      };
    }),

  // Path to the inline Experience logos, relative to the page loading this file.
  mediaBase: "cv/media/",

  /* --- sections/education.tex ------------------------------------------- */
  education: [
    {
      title: "Pohang University of Science and Technology, POSTECH",
      location: "Pohang, Korea",
      detail: "M.S. & Ph.D., Electrical Engineering (Advisor: Tae-Hyun Oh)",
      date: "Sep. 2020 – Feb. 2027 (Exp.)",
    },
    {
      title: "Pohang University of Science and Technology, POSTECH",
      location: "Pohang, Korea",
      detail: "B.S., Electrical Engineering",
      date: "Mar. 2016 – Aug. 2020",
    },
  ],

  // sections/research_interests.tex — not rendered (call is commented out in cv-render.js).
  researchInterests: {
    goal: "Build photorealistic & interactive world simulations for next-gen. physical AI & content creation",
    keywords: "Generative Models, Real-time Graphics, Neural Rendering, Neural Materials",
  },

  // Any name appearing in an entry's `detail` line (managers, advisors, …) auto-links.
  peopleLinks: {
    "Jacob Munkberg": "https://research.nvidia.com/labs/rtr/author/jacob-munkberg/",
    "Jon Hasselgren": "https://research.nvidia.com/labs/rtr/author/jon-hasselgren/",
    "Miloš Hašan": "https://miloshasan.net/",
    "Yaser Sheikh": "https://www.cs.cmu.edu/~yaser/",
    "Chen Cao": "https://sites.google.com/site/zjucaochen/home",
    "Gerard Pons-Moll": "https://virtualhumans.mpi-inf.mpg.de/people/pons-moll.html",
    "Tae-Hyun Oh": "https://ami.kaist.ac.kr/members/tae-hyun-oh",
  },

  /* sections/experience.tex — first line renders [logo] Org (Team) – Role;
   * team/role optional. logo: "nvidia" | "meta" | null -> file in `mediaBase`. */
  experience: [
    {
      org: "NVIDIA",
      team: "Real-Time Graphics Research",
      role: "Research Intern",
      logo: "nvidia",
      location: "Santa Clara, CA, US",
      detail: "Managers: Jacob Munkberg, Jon Hasselgren, Miloš Hašan",
      date: "Aug. 2026 – Nov. 2026",
    },
    {
      org: "NVIDIA",
      team: "Real-Time Graphics Research",
      role: "Research Intern",
      logo: "nvidia",
      location: "Remote, Korea",
      detail: "Managers: Jacob Munkberg, Jon Hasselgren",
      date: "Mar. 2026 – Jun. 2026",
    },
    {
      org: "Meta",
      team: "Codec Avatars Lab",
      role: "Research Scientist Intern",
      logo: "meta",
      location: "Pittsburgh, PA, US",
      detail: "Managers: Yaser Sheikh, Chen Cao",
      date: "Oct. 2024 – Mar. 2025",
    },
    {
      org: "Univ. of Tübingen",
      team: "Real Virtual Humans group",
      role: "Visiting Ph.D.",
      logo: null,
      location: "Tübingen, Germany",
      detail: "Advisor: Gerard Pons-Moll",
      date: "Oct. 2023 – Mar. 2024",
    },
  ],

  /* --- sections/award.tex ----------------------------------------------- */
  awards: [
    {
      title: "Best Poster Award, BMVC",
      year: "2024",
      note: "“MeTTA: Single-View to 3D Textured Mesh Reconstruction with Test-Time Adaptation”",
    },
    {
      title: "Excellence Prize, Electronics Times ICT Paper Awards",
      year: "2024",
      note: "“Feed-Forward Photorealistic Style Transfer for Large-Scale 3D Neural Radiance Field”",
    },
    {
      title: "Best Poster Award, POSTECH-KAIST Joint ML Workshop",
      year: "2024",
      note: "“Paint-it: Text-to-Texture Synthesis via Deep Convolutional Texture Map Optimization and ...”",
    },
    {
      title: "Grand Prize (Minister's Award, $12,000), Electronics Times ICT Paper Awards",
      year: "2023",
      note: "“CLIP-Actor: Text-Driven Recommendation and Stylization for Generating Virtual Human Avatars”",
    },
    {
      title: "Outstanding Reviewer Award, ICCV",
      year: "2023",
      note: "Top 1.89% reviewer among 6990 reviewers",
    },
    {
      title: "Winner ($4,000), Qualcomm Innovation Fellowship Korea (QIFK)",
      year: "2022",
      note: "“CLIP-Actor: Text-Driven Recommendation and Stylization for Animating Human Meshes”",
    },
    {
      title: "International Computer Vision Summer School (ICVSS)",
      year: "2022",
      note: "“Unified 3D Mesh Recovery of Humans and Animals by Learning Animal Exercise”",
    },
  ],

  /* Shared with index.html; edit script/publications-data.js only. */
  publications: window.PUBLICATIONS_DB,

  /* --- sections/techtransfer.tex ---------------------------------------- */
  techtransfer: [
    {
      bold: "(illuni Inc., 2026)",
      text: "Text-based 3D human avatar appearance generation and animation technology",
    },
  ],

  /* --- sections/patent.tex ---------------------------------------------- */
  patents: [
    {
      bold: "(US 20240273798A1)",
      text: "Text-driven motion recommendation and neural mesh stylization system and a method for producing human mesh animation using the same",
    },
    {
      bold: "(KR 10-2886014)",
      text: "Method and apparatus for motion animating and mesh stylization using text-driven motion recommendation",
    },
    {
      bold: "(KR 10-2459293)",
      text: "Method and apparatus for generating mesh model of human or quadrupeds",
    },
    {
      bold: "(KR 10-2416218)",
      text: "Method and apparatus for obtaining segmentation of object included in image frame",
    },
  ],

  // sections/mentoring.tex — bold: true bolds the whole line; boldSpan bolds just that substring.
  mentoring: [
    { bold: true, text: "Mentored 2 Graduate Juniors & 7 Undergraduate Interns" },
    {
      bold: false,
      text: "4 mentees' projects led to top-tier publications (IJCV'26, CVPR'25, AAAI'24, ECCV'22, TVCJ'23)",
      boldSpan: "top-tier publications",
    },
    { bold: false, text: "Mentored on problem formulation, method design, implementation, and paper writing" },
  ],

  // sections/professional_activities.tex — highlight: substring of `years` rendered in blue.
  professionalActivities: {
    journalReviewer: {
      title: "Reviewer for Journals",
      items: [
        { name: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)", years: "2024, 2025" },
        { name: "ACM Transactions on Graphics (ACM TOG)", years: "2026" },
        { name: "International Journal of Computer Vision (IJCV)", years: "2024, 2025, 2026" },
        { name: "IEEE Transactions on Visualization and Computer Graphics (TVCG)", years: "2026" },
        { name: "IEEE Transactions on Multimedia (TMM)", years: "2023" },
        { name: "Transactions on Machine Learning Research (TMLR)", years: "2025" },
      ],
    },
    conferenceReviewer: {
      title: "Reviewer for Conference Papers",
      items: [
        { name: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)", years: "2024, 2025" },
        {
          name: "IEEE/CVF International Conference on Computer Vision (ICCV)",
          years: "2023 (Outstanding Reviewer), 2025",
          highlight: "Outstanding Reviewer",
        },
        { name: "ACM SIGGRAPH", years: "2026" },
        { name: "ACM SIGGRAPH Asia", years: "2024, 2026" },
        { name: "European Conference on Computer Vision (ECCV)", years: "2024, 2026" },
        { name: "Conference on Neural Information Processing Systems (NeurIPS)", years: "2024, 2025" },
        { name: "IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)", years: "2026" },
        { name: "British Machine Vision Conference (BMVC)", years: "2024" },
      ],
    },
  },

  // sections/references.tex
  // references: [
  //   {
  //     name: "Tae-Hyun Oh",
  //     role: "Associate Professor, KAIST, Korea",
  //     relationship: "M.S. & Ph.D. advisor",
  //     email: "thoh.kaist.ac.kr@gmail.com",
  //   },
  //   {
  //     name: "Kyungdon Joo",
  //     role: "Associate Professor, UNIST, Korea",
  //     relationship: "Coauthor",
  //     email: "kyungdon@unist.ac.kr",
  //   },
  // ],

  /* Unused: talk.tex / media.tex aren't \input'd by main.tex, not part of the
   * compiled PDF. Uncomment here + the matching calls in cv-render.js to enable. */
  // talks: [
  //   { title: "Towards Efficient & Realistic Virtual World Communication",
  //     venue: "INNERVERZ, Korea", date: "Feb. 2023" },
  // ],
  // media: [
  //   { date: "Dec. 2023", tag: "(CLIP-Actor extension)",
  //     text: "Featured by Korean Internet news, including Veritas-α, etnews, ZUM News, and Daegu News Paper." },
  //   { date: "Apr. 2023", tag: "(FastMETRO, ECCV 2022, IPIU 2021, IPIU 2022)",
  //     text: "Featured as a representative trend in the “Weekly ICT Trends” report, Vol. 2086 (2023.04.05) published by Institute for Information & communication Technology Planning & evaluation (IITP), Korea." },
  // ],
};
