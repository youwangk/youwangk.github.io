/*
 * Canonical publication database for both index.html and cv.html.
 *
 * Add or edit papers only in `items` below. The homepage renderer uses the
 * full author names, media, venue and action links; the CV renderer uses the
 * abbreviated author line and the `cv` entries for grouping and notes.
 */
(function () {
    "use strict";

    window.PUBLICATIONS_DB = {
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
            ["TVCJ", "The Visual Computer Journal"]
        ],

        items: [
            {
                id: "neumatex",
                image: "./media/neumatex_teaser.gif",
                title: "Extracting Neural Materials from Multi-view Images",
                authors: "Kim Youwang, Jon Hasselgren, Peter Kocsis, Andrea Weidlich, Tae-Hyun Oh, Jacob Munkberg",
                cvAuthors: "Kim Youwang, J. Hasselgren, P. Kocsis, A. Weidlich, T.-H. Oh, J. Munkberg",
                venue: "NVIDIA Tech Report 2026",
                links: [
                    { name: "Project page", url: "https://nvlabs.github.io/neumatex/" },
                    { name: "Paper", url: "https://arxiv.org/abs/2606.26715" },
                    { name: "Supp", url: "https://nvlabs.github.io/neumatex/assets/supp.pdf" },
                    { name: "Video", url: "https://nvlabs.github.io/neumatex/assets/video.mp4" }
                ],
                cvHighlight: {
                    order: 1,
                    title: "NeuMatEx: Extracting neural materials from images,",
                    collab: "with NVIDIA (Tech report)"
                },
                cv: [{ category: "conference", order: 1, venue: "NVIDIA Tech Report 2026" }]
            },
            {
                id: "elite",
                image: "./media/eff_face_avatar.gif",
                title: "ELITE: Efficient Gaussian Head Avatar from a Monocular Video via Learned Initialization and TEst-time Generative Adaptation",
                authors: "Kim Youwang, Lee Hyoseok, Park Subin, Gerard Pons-Moll, Tae-Hyun Oh",
                cvAuthors: "Kim Youwang, L. Hyoseok, P. Subin, G. Pons-Moll, T.-H. Oh",
                venue: "CVPR 2026",
                links: [
                    { name: "Project page", url: "https://kim-youwang.github.io/elite" },
                    { name: "Paper", url: "https://drive.google.com/file/d/183UFp5t1LIQZQWx6p_XLwWmD7c5R82ww/view?usp=sharing" },
                    { name: "Video", url: "https://www.youtube.com/watch?v=ySBbw85SLqA" },
                    { name: "Code", url: "https://github.com/kaist-ami/elite" }
                ],
                cvHighlight: {
                    order: 3,
                    title: "ELITE: High-fidelity animatable avatar synthesis,",
                    collab: "with Univ. of Tübingen (CVPR'26)"
                },
                cv: [{ category: "conference", order: 3, venue: "CVPR 2026" }]
            },
            {
                id: "fica",
                image: "./media/face_avatar.gif",
                title: "FiCA: Feed-forward instant Gaussian Codec Avatars from a Single Portrait Image",
                authors: "Kim Youwang, Zhengyu Yang, Liuhao Ge, Yu Rong, Timur Bagautdinov, Su Zhaoen, Nir Sopher, Jovan Popović, Teng Deng, Tae-Hyun Oh, Chen Cao",
                cvAuthors: "Kim Youwang, Z. Yang, L. Ge, Y. Rong, T. Bagautdinov, S. Zhaoen, N. Sopher, J. Popović, T. Deng, T.-H. Oh, C. Cao",
                venue: "Meta Tech Report 2026",
                links: [
                    { name: "Project page", url: "https://kim-youwang.github.io/FiCA" },
                    { name: "Paper", url: "https://arxiv.org/abs/2606.24232" },
                    { name: "Video", url: "https://youtu.be/oIW3ZooWaQw" }
                ],
                cvHighlight: {
                    order: 2,
                    title: "FiCA: Feed-forward animatable avatar from a selfie,",
                    collab: "with Meta (Tech report)"
                },
                cv: [{ category: "conference", order: 2, venue: "Meta Tech Report 2026" }]
            },
            {
                id: "robot-state-estimation",
                image: "./media/robot.png",
                title: "A Paper on Vision-based Robot State Estimation",
                authors: "",
                venue: "Under revision",
                links: [],
                cv: [{
                    category: "journal",
                    order: 1,
                    venue: "Under Revision",
                    citation: "A paper on “Vision-based robot state estimation.”"
                }]
            },
            {
                id: "clip-actor-x",
                image: "./media/clip-actor-x_crop.jpg",
                title: "CLIP-Actor-X: Text-driven 4D Human Avatar Generation via Cross-modal Synthesis-through-Optimization",
                authors: "Kim Youwang*, Taehyun Byun*, Kim Ji-Yeon, Sungjoon Choi, Tae-Hyun Oh",
                cvAuthors: "Kim Youwang*, T. Byun*, K. Ji-Yeon, S. Choi, T.-H. Oh",
                venue: "TPAMI 2026",
                links: [
                    { name: "Paper", url: "https://ieeexplore.ieee.org/document/11408037" }
                ],
                cv: [{ category: "journal", order: 2, venue: "TPAMI 2026" }]
            },
            {
                id: "fpgs",
                image: "./media/fpgs.gif",
                title: "FPGS: Feed-Forward Semantic-aware Photorealistic Style Transfer of Large-Scale Gaussian Splatting",
                authors: "GeonU Kim, Kim Youwang, Lee Hyoseok, Tae-Hyun Oh",
                cvAuthors: "G. Kim, Kim Youwang, L. Hyoseok, T.-H. Oh",
                venue: "IJCV 2026",
                links: [
                    { name: "Project page", url: "https://kim-geonu.github.io/FPGS/" },
                    { name: "Paper", url: "https://arxiv.org/abs/2503.09635" },
                    { name: "Code", url: "https://github.com/kaist-ami/FPGS" }
                ],
                cv: [{
                    category: "journal",
                    order: 3,
                    venue: "IJCV 2026",
                    note: "Excellence Prize at the Electronics Times ICT Paper Awards 2024"
                }]
            },
            {
                id: "dress-up",
                image: "./media/dress_up.png",
                title: "Dress-up: Generating Animatable Clothed 3D Humans via Latent Modeling of 3D Gaussian Texture Maps",
                authors: "Kim Youwang, Lee Hyoseok, Gerard Pons-Moll, Tae-Hyun Oh",
                cvAuthors: "Kim Youwang, L. Hyoseok, G. Pons-Moll, T.-H. Oh",
                venue: "ICCVw 2025",
                websiteNote: "Oral presentation",
                links: [
                    { name: "Paper", url: "./media/pdfs/dress_up_camready.pdf" },
                    { name: "Slide", url: "./media/pdfs/dress_up_iccvw_oral.pdf" }
                ],
                cv: [{
                    category: "conference",
                    order: 4,
                    venue: "ICCVW 2025",
                    note: "Oral presentation"
                }]
            },
            {
                id: "zeroshape-w",
                image: "./media/zeroshape-w_cvpr25.png",
                title: "Robust 3D Shape Reconstruction in Zero-Shot from a Single Image in the Wild",
                authors: "Junhyeong Cho, Kim Youwang, Hunmin Yang, Tae-Hyun Oh",
                cvAuthors: "J. Cho, Kim Youwang, H. M. Yang, T.-H. Oh",
                venue: "CVPR 2025",
                links: [
                    { name: "Project page", url: "https://zeroshape-w.github.io/" },
                    { name: "Paper", url: "https://arxiv.org/abs/2403.14539v2" }
                ],
                cv: [{ category: "conference", order: 5, venue: "CVPR 2025" }]
            },
            {
                id: "neuface",
                image: "./media/4d_face.gif",
                title: "A Large-Scale 3D Face Mesh Video Dataset via Neural Re-parameterized Optimization",
                authors: "Kim Youwang, Lee Hyun*, Kim Sung-Bin*, Suekyeong Nam, Janghoon Ju, Tae-Hyun Oh",
                cvAuthors: "Kim Youwang, L. Hyun*, K. Sung-Bin*, S.-K. Nam, J.-H. Joo, T.-H. Oh",
                venue: "ICLR 2025 / TMLR 2024",
                links: [
                    { name: "Project page", url: "https://kim-youwang.github.io/neuface" },
                    { name: "Paper", url: "https://openreview.net/forum?id=zVDMh6JvWc" },
                    { name: "Code", url: "https://github.com/kaist-ami/NeuFace" }
                ],
                cv: [
                    {
                        category: "journal",
                        order: 4,
                        venue: "TMLR 2024",
                        note: "Top 5.0% TMLR papers in 2 years – Transferred to ICLR 2025"
                    },
                    {
                        category: "conference",
                        order: 6,
                        venue: "ICLR 2025",
                        note: "Invited as a poster presentation – Top 5.0% TMLR papers in 2 years invited"
                    }
                ]
            },
            {
                id: "paint-it",
                image: "./media/paint_it.jpg",
                title: "Paint-it: Text-to-Texture Synthesis via Deep Convolutional Texture Map Optimization and Physically-Based Rendering",
                authors: "Kim Youwang, Tae-Hyun Oh, Gerard Pons-Moll",
                cvAuthors: "Kim Youwang, T.-H. Oh, G. Pons-Moll",
                venue: "CVPR 2024",
                links: [
                    { name: "Project page", url: "https://kim-youwang.github.io/paint-it" },
                    { name: "Paper", url: "https://arxiv.org/abs/2312.11360" },
                    { name: "Video", url: "https://youtu.be/uSKK-ekVJLg" },
                    { name: "Code", url: "https://github.com/kaist-ami/paint-it" },
                    { name: "Poster", url: "https://www.dropbox.com/scl/fi/4plpanxqy0lo16d3d8t8p/cvpr24_poster_youwang_final.pdf?rlkey=gah19krwju0clqdsep6g3qd4w&st=x831q8a5&dl=0" }
                ],
                cvHighlight: {
                    order: 4,
                    title: "Paint-it: Physics-based materials from text,",
                    collab: "with Univ. of Tübingen (CVPR'24)"
                },
                cv: [{
                    category: "conference",
                    order: 8,
                    venue: "CVPR 2024",
                    note: "Best Poster Award at POSTECH-KAIST joint ML workshop 2024"
                }]
            },
            {
                id: "metta",
                image: "./media/metta.gif",
                title: "MeTTA: Single-View to 3D Textured Mesh Reconstruction with Test-Time Adaptation",
                authors: "Kim Yu-Ji, Hyunwoo Ha, Kim Youwang, Jaeheung Surh, Hyowon Ha, Tae-Hyun Oh",
                cvAuthors: "K. Yu-Ji, H. Ha, Kim Youwang, J. Surh, H. Ha, T.-H. Oh",
                venue: "BMVC 2024",
                websiteNote: "Best Poster Award",
                links: [
                    { name: "Project page", url: "https://metta3d.github.io/" }
                ],
                cv: [{
                    category: "conference",
                    order: 7,
                    venue: "BMVC 2024",
                    note: "Best Poster Award at BMVC 2024"
                }]
            },
            {
                id: "fprf",
                image: "./media/fprf_v2.gif",
                title: "Feed-Forward Photorealistic Style Transfer for Large-Scale 3D Neural Radiance Fields",
                authors: "GeonU Kim, Kim Youwang, Tae-Hyun Oh",
                cvAuthors: "G. Kim, Kim Youwang, T.-H. Oh",
                venue: "AAAI 2024",
                links: [
                    { name: "Project page", url: "https://kim-geonu.github.io/FPRF/" },
                    { name: "Paper", url: "https://arxiv.org/abs/2401.05516" },
                    { name: "Code", url: "https://github.com/kaist-ami/FPRF" }
                ],
                cv: [{ category: "conference", order: 9, venue: "AAAI 2024" }]
            },
            {
                id: "rank-pruning",
                image: "./media/rank_pruning.jpg",
                title: "Multi-stage Adaptive Rank Statistic Pruning for Lightweight Human 3D Mesh Recovery Model",
                authors: "Dong Hun Ryou, Kim Youwang, Tae-Hyun Oh",
                cvAuthors: "D. H. Ryou, Kim Youwang, T.-H. Oh",
                venue: "The Visual Computer Journal (TVCJ) 2023",
                links: [
                    { name: "Paper", url: "https://link.springer.com/article/10.1007/s00371-023-02798-x" }
                ],
                cv: [{ category: "journal", order: 5, venue: "TVCJ 2023" }]
            },
            {
                id: "clip-actor",
                image: "./media/clip_actor.gif",
                title: "CLIP-Actor: Text-Driven Recommendation and Stylization for Animating Human Meshes",
                authors: "Kim Youwang*, Kim Ji-Yeon*, Tae-Hyun Oh",
                cvAuthors: "Kim Youwang*, K. Ji-Yeon*, T.-H. Oh",
                venue: "ECCV 2022",
                links: [
                    { name: "Project page", url: "https://clip-actor.github.io" },
                    { name: "Paper", url: "https://arxiv.org/abs/2206.04382" },
                    { name: "Video", url: "https://youtu.be/oWr4NP-eVLY" },
                    { name: "Code", url: "https://github.com/kaist-ami/CLIP-Actor" },
                    { name: "Poster", url: "https://www.dropbox.com/s/8l2jvvc0po6szn7/3229-poster.pdf?dl=0" }
                ],
                cv: [{
                    category: "conference",
                    order: 10,
                    venue: "ECCV 2022",
                    note: "Winner of the Electronics Times ICT Paper Awards 2023, Winner of the Qualcomm Innovation Fellowship Korea, 2022"
                }]
            },
            {
                id: "fastmetro",
                image: "./media/fastmetro_teaser.jpg",
                title: "FastMETRO: Cross-Attention of Disentangled Modalities for 3D Human Mesh Recovery with Transformers",
                authors: "Junhyeong Cho, Kim Youwang, Tae-Hyun Oh",
                cvAuthors: "J. Cho, Kim Youwang, T.-H. Oh",
                venue: "ECCV 2022",
                links: [
                    { name: "Project page", url: "https://fastmetro.github.io/" },
                    { name: "Paper", url: "https://arxiv.org/abs/2207.13820" },
                    { name: "Code", url: "https://github.com/kaist-ami/FastMETRO" },
                    { name: "Poster", url: "https://www.dropbox.com/s/kzmihz488qcelxi/2116-poster.pdf?dl=0" }
                ],
                cv: [{ category: "conference", order: 11, venue: "ECCV 2022" }]
            },
            {
                id: "demr",
                image: "./media/demr.jpg",
                title: "Unified 3D Mesh Recovery of Humans and Animals by Learning Animal Exercise",
                authors: "Kim Youwang, Kim Ji-Yeon, Kyungdon Joo, Tae-Hyun Oh",
                cvAuthors: "Kim Youwang, K. Ji-Yeon, K. Joo, T.-H. Oh",
                venue: "BMVC 2021",
                links: [
                    { name: "Project page", url: "https://kim-youwang.github.io/demr" },
                    { name: "Paper", url: "https://arxiv.org/abs/2111.02450" }
                ],
                cv: [{
                    category: "conference",
                    order: 12,
                    venue: "BMVC 2021",
                    note: "Invited to ICVSS 2022"
                }]
            }
        ]
    };
})();
