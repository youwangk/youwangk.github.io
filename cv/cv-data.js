/* cv-data.js — all editable CV content. Mirrors LaTeX `sections/*.tex` 1:1;
 * add a job/paper/award/patent by pushing an object into the array, no other
 * file needs to change.
 *
 * Conventions: "Kim Youwang" auto-bolds in author strings; a trailing "*"
 * means equal contribution; publications are most-recent-first and labelled
 * J01../C01.. in reverse (see cv-render.js), like LaTeX `etaremune` did; a
 * publication's `url` attaches to the quoted title. */

window.CV_DATA = {

  /* --- Header (main.tex) ------------------------------------------------ */
  header: {
    name: "Kim Youwang",
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
    "Youwang's research aims to build **photorealistic and interactive world simulations** for **content creation** and **physical AI**.",
    "Recently, his focus is on **generative materials** and **neural rendering**.",
  ],

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

  /* --- sections/publications.tex + sections/paper_abbrev.tex ------------- */
  publications: {
    abbreviations: [
      ["TPAMI", "IEEE Transactions on Pattern Analysis and Machine Intelligence"],
      ["IJCV", "International Journal of Computer Vision"],
      ["TMLR", "Transactions on Machine Learning Research"],
      ["CVPR", "IEEE Conference on Computer Vision and Pattern Recognition"],
      ["ECCV", "European Conference on Computer Vision"],
      ["ICCV", "IEEE International Conference on Computer Vision"],
      ["ICLR", "International Conference on Learning Representation"],
      ["AAAI", "AAAI Conference on Artificial Intelligence"],
      ["BMVC", "British Machine Vision Conference"],
      ["TVCJ", "The Visual Computer Journal"],
    ],

    /* Most recent first. Labels J05 … J01 are generated automatically. */
    journal: [
      {
        authors: "A paper on “Vision-based robot state estimation.”",
        venue: "Under Review",
      },
      {
        authors: "Kim Youwang*, T. Byun*, K. Ji-Yeon, S. Choi, T.-H. Oh, “CLIP-Actor-X: Text-driven 4D Human Avatar Generation via Cross-modal Synthesis-through-Optimization.”",
        venue: "TPAMI 2026",
        url: "https://ieeexplore.ieee.org/document/11408037"
      },
      {
        authors: "G. Kim, Kim Youwang, L. Hyoseok, T.-H. Oh, “FPGS: Feed-Forward Semantic-aware Photorealistic Style Transfer of Large-Scale Gaussian Splatting.”",
        venue: "IJCV 2026",
        url: "https://kim-geonu.github.io/FPGS/",
        note: "Excellence Prize at the Electronics Times ICT Paper Awards 2024",
      },
      {
        authors: "Kim Youwang, L. Hyun*, K. Sung-Bin*, S.-K. Nam, J.-H. Joo, T.-H. Oh, “A Large-Scale 3D Face Mesh Video Dataset via Neural Re-parameterized Optimization.”",
        venue: "TMLR 2024",
        url: "https://kim-youwang.github.io/neuface",
        note: "Top 5.0% TMLR papers in 2 years – Transferred to ICLR 2025",
      },
      {
        authors: "D. H. Ryou, Kim Youwang, T.-H. Oh, “Multi-stage Adaptive Rank Statistic Pruning for Lightweight Human 3D Mesh Recovery Model.”",
        venue: "TVCJ 2023",
        url: "https://link.springer.com/article/10.1007/s00371-023-02798-x",
      },
    ],

    /* Most recent first. Labels C12 … C01 are generated automatically. */
    conference: [
      {
        authors: "Kim Youwang, J. Hasselgren, P. Kocsis, A. Weidlich, T.-H. Oh, J. Munkberg, “Extracting Neural Materials from Multi-view Images.”",
        venue: "arXiv 2026",
        url: "https://nvlabs.github.io/neumatex/",
      },
      {
        authors: "Kim Youwang, Z. Yang, L. Ge, Y. Rong, T. Bagautdinov, S. Zhaoen, N. Sopher, J. Popović, T. Deng, T.-H. Oh, C. Cao, “FiCA: Feed-forward instant Gaussian Codec Avatars from a Single Portrait Image.”",
        venue: "arXiv 2026",
        url: "https://kim-youwang.github.io/FiCA",
      },
      {
        authors: "Kim Youwang, L. Hyoseok, P. Subin, G. Pons-Moll, T.-H. Oh, “ELITE: Efficient Gaussian Head Avatar from a Monocular Video via Learned Initialization and TEst-time Generative Adaptation.”",
        venue: "CVPR 2026",
        url: "https://kim-youwang.github.io/elite",
      },
      {
        authors: "Kim Youwang, L. Hyoseok, G. Pons-Moll, T.-H. Oh, “Dress-up: Generating Animatable Clothed 3D Humans via Latent Modeling of 3D Gaussian Texture Maps.”",
        venue: "ICCVW 2025",
        url: "./media/pdfs/dress_up_camready.pdf",
        note: "Oral presentation",
      },
      {
        authors: "J. Cho, Kim Youwang, H. M. Yang, T.-H. Oh, “Robust 3D Shape Reconstruction in Zero-Shot from a Single Image in the Wild.”",
        venue: "CVPR 2025",
        url: "https://zeroshape-w.github.io/",
      },
      {
        authors: "Kim Youwang, L. Hyun*, K. Sung-Bin*, S.-K. Nam, J.-H. Joo, T.-H. Oh, “A Large-Scale 3D Face Mesh Video Dataset via Neural Re-parameterized Optimization.”",
        venue: "ICLR 2025",
        url: "https://kim-youwang.github.io/neuface",
        note: "Invited as a poster presentation – Top 5.0% TMLR papers in 2 years invited",
      },
      {
        authors: "K. Yu-Ji, H. Ha, Kim Youwang, J. Surh, H. Ha, T.-H. Oh, “MeTTA: Single-View to 3D Textured Mesh Reconstruction with Test-Time Adaptation.”",
        venue: "BMVC 2024",
        url: "https://metta3d.github.io/",
        note: "Best Poster Award at BMVC 2024",
      },
      {
        authors: "Kim Youwang, T.-H. Oh, G. Pons-Moll, “Paint-it: Text-to-Texture Synthesis via Deep Convolutional Texture Map Optimization and Physically-Based Rendering.”",
        venue: "CVPR 2024",
        url: "https://kim-youwang.github.io/paint-it",
        note: "Best Poster Award at POSTECH-KAIST joint ML workshop 2024",
      },
      {
        authors: "G. Kim, Kim Youwang, T.-H. Oh, “Feed-Forward Photorealistic Style Transfer for Large-Scale 3D Neural Radiance Field.”",
        venue: "AAAI 2024",
        url: "https://kim-geonu.github.io/FPRF/",
      },
      {
        authors: "Kim Youwang*, K. Ji-Yeon*, T.-H. Oh, “CLIP-Actor: Text-Driven Recommendation and Stylization for Animating Human Meshes.”",
        venue: "ECCV 2022",
        url: "https://clip-actor.github.io",
        note: "Winner of the Electronics Times ICT Paper Awards 2023, Winner of the Qualcomm Innovation Fellowship Korea, 2022",
      },
      {
        authors: "J. Cho, Kim Youwang, T.-H. Oh, “Cross-Attention of Disentangled Modalities for 3D Human Mesh Recovery with Transformers.”",
        venue: "ECCV 2022",
        url: "https://fastmetro.github.io/",
      },
      {
        authors: "Kim Youwang, K. Ji-Yeon, K. Joo, T.-H. Oh, “Unified 3D Mesh Recovery of Humans and Animals by Learning Animal Exercise,”",
        venue: "BMVC 2021",
        url: "https://kim-youwang.github.io/demr",
        note: "Invited to ICVSS 2022",
      },
    ],
  },

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
        { name: "International Journal of Computer Vision (IJCV)", years: "2024, 2025" },
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
