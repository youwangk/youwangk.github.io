/*
 * Homepage news database.
 *
 * Add new entries to `items` using a year-month date (YYYY-MM). The renderer
 * sorts entries newest-first and formats the date. `initialVisible` controls
 * the collapsed list; `expandedVisible` controls the expanded scroll height.
 */
(function () {
    "use strict";

    window.NEWS_DB = {
        initialVisible: 5,
        expandedVisible: 10,
        items: [
            {
                date: "2026-09",
                title: "Will serve as an Area Chair for CVPR 2027",
                url: "https://cvpr.thecvf.com/",
                isNew: true
            },
            {
                date: "2026-08",
                title: "Started a 2nd internship at NVIDIA Research",
                url: "https://research.nvidia.com/labs/rtr/author/youwang-kim/",
                isNew: true
            },
            {
                date: "2026-06",
                title: "NeuMatEx released as an NVIDIA Technical Report",
                url: "https://nvlabs.github.io/neumatex/",
                isNew: true
            },
            {
                date: "2026-06",
                title: "FiCA released as a Meta Technical Report",
                url: "https://kim-youwang.github.io/FiCA",
                isNew: true
            },
            {
                date: "2026-03",
                title: "Started an internship at NVIDIA Research",
                url: "https://research.nvidia.com/labs/rtr/author/youwang-kim/",
            },
            {
                date: "2026-02",
                title: "ELITE accepted to CVPR 2026",
                url: "https://kim-youwang.github.io/elite"
            },
            {
                date: "2026-02",
                title: "CLIP-Actor-X accepted to TPAMI 2026",
                url: "https://ieeexplore.ieee.org/document/11408037"
            },
            {
                date: "2026-02",
                title: "FPGS accepted to IJCV 2026",
                url: "https://kim-geonu.github.io/FPGS/"
            },
            {
                date: "2025-10",
                title: "Dress-up accepted to ICCV 2025 Workshop (Oral)",
                url: "./media/pdfs/dress_up_iccvw_oral.pdf"
            },
            {
                date: "2025-02",
                title: "ZeroShape-W accepted to CVPR 2025",
                url: "https://zeroshape-w.github.io/"
            },
            {
                date: "2024-12",
                title: "NeuFace accepted to ICLR 2025",
                url: "https://kim-youwang.github.io/neuface"
            },
            {
                date: "2024-11",
                title: "MeTTA won Best Poster at BMVC 2024",
                url: "https://metta3d.github.io/"
            },
            {
                date: "2024-10",
                title: "Started an internship at Meta Codec Avatars Lab",
                url: "https://www.meta.com/emerging-tech/codec-avatars/"
            },
            {
                date: "2024-07",
                title: "NeuFace accepted to TMLR 2024",
                url: "https://kim-youwang.github.io/neuface"
            },
            {
                date: "2024-07",
                title: "MeTTA accepted to BMVC 2024",
                url: "https://metta3d.github.io/"
            },
            {
                date: "2024-02",
                title: "Paint-it accepted to CVPR 2024",
                url: "https://kim-youwang.github.io/paint-it"
            },
            {
                date: "2023-12",
                title: "FPRF accepted to AAAI 2024",
                url: "https://kim-geonu.github.io/FPRF/"
            },
            {
                date: "2023-10",
                title: "Joined the University of T\u00fcbingen as a visiting Ph.D. student",
                url: "https://virtualhumans.mpi-inf.mpg.de/"
            },
            {
                date: "2023-01",
                title: "Rank Pruning HMR accepted to TVCJ 2023",
                url: "https://link.springer.com/article/10.1007/s00371-023-02798-x"
            },
            {
                date: "2022-07",
                title: "CLIP-Actor accepted to ECCV 2022",
                url: "https://clip-actor.github.io"
            },
            {
                date: "2022-07",
                title: "FastMETRO accepted to ECCV 2022",
                url: "https://fastmetro.github.io/"
            },
            {
                date: "2021-10",
                title: "DEMR accepted to BMVC 2021",
                url: "https://kim-youwang.github.io/demr"
            }
        ]
    };
})();
