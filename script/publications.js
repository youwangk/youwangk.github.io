// ============================================
// Publications Data
// 새로운 논문을 추가하려면 이 배열에 항목을 추가하세요.
// ============================================
const publicationsData = [
    {
        image: "./media/eff_face_avatar.gif",
        title: "<span style=\"color: #3c9bd4;\">ELITE</span>: <span style=\"color: #3c9bd4;\">E</span>fficient Gaussian Head Avatar from a Monocular Video via <span style=\"color: #3c9bd4;\">L</span>earned <span style=\"color: #3c9bd4;\">I</span>nitialization and <span style=\"color: #3c9bd4;\">TE</span>st-time Generative Adaptation",
        authors: "<u>Kim Youwang</u>, Lee Hyoseok, Park Subin, Gerard Pons-Moll, Tae-Hyun Oh",
        venue: "CVPR 2026",
        links: [
            { name: "Project page", url: "https://kim-youwang.github.io/elite" },
            { name: "Paper", url: "https://arxiv.org/abs/2601.10200" },
            { name: "Video", url: "https://www.youtube.com/watch?v=ySBbw85SLqA" },
            { name: "Code(TBU)", url: "https://github.com/kaist-ami/elite" }
        ]
    },
    {
        image: "./media/face_avatar.gif",
        title: "A Paper on Monocular Feed-forward 3D Face Avatar Synthesis",
        authors: "",
        venue: "To be updated",
        links: []
    },
    {
        image: "./media/robot.png",
        title: "A Paper on Vision-based Robot State Estimation",
        authors: "",
        venue: "To be updated",
        links: []
    },
    {
        image: "./media/clip-actor-x_crop.jpg",
        title: "CLIP-Actor-X: Text-driven 4D Human Avatar Generation via Cross-modal Synthesis-through-Optimization",
        authors: "<u>Kim Youwang</u>*, Taehyun Byun*, Kim Ji-Yeon, Sungjoon Choi, Tae-Hyun Oh",
        venue: "TPAMI 2026",
        links: []
    },
    {
        image: "./media/fpgs.gif",
        title: "FPGS: Feed-Forward Semantic-aware Photorealistic Style Transfer of Large-Scale Gaussian Splatting",
        authors: "GeonU Kim, <u>Kim Youwang</u>, Lee Hyoseok, Tae-Hyun Oh",
        venue: "IJCV 2026",
        links: [
            { name: "Project page", url: "https://kim-geonu.github.io/FPGS/" },
            { name: "Paper", url: "https://arxiv.org/abs/2503.09635" },
            { name: "Code(TBA)", url: "https://github.com/kaist-ami/" }
        ]
    },
    {
        image: "./media/dress_up.png",
        title: "Dress-up: Generating Animatable Clothed 3D Humans via Latent Modeling of 3D Gaussian Texture Maps",
        authors: "<u>Kim Youwang</u>, Lee Hyoseok, Gerard Pons-Moll, Tae-Hyun Oh",
        venue: "ICCVw 2025 - <span style=\"color:#c00000;\">Oral presentation</span>",
        links: [
            { name: "Paper", url: "./media/pdfs/dress_up_camready.pdf" },
            { name: "Slide", url: "./media/pdfs/dress_up_iccvw_oral.pdf" }
        ]
    },
    {
        image: "./media/zeroshape-w_cvpr25.png",
        title: "Robust 3D Shape Reconstruction in Zero-Shot from a Single Image in the Wild",
        authors: "Junhyeong Cho, <u>Kim Youwang</u>, Hunmin Yang, Tae-Hyun Oh",
        venue: "CVPR 2025",
        links: [
            { name: "Project page", url: "https://zeroshape-w.github.io/" },
            { name: "Paper", url: "https://arxiv.org/abs/2403.14539v2" }
        ]
    },
    {
        image: "./media/4d_face.gif",
        title: "A Large-Scale 3D Face Mesh Video Dataset via Neural Re-parameterized Optimization",
        authors: "<u>Kim Youwang</u>, Lee Hyun*, Kim Sung-Bin*, Suekyeong Nam, Janghoon Ju, Tae-Hyun Oh",
        venue: "ICLR 2025 / TMLR 2024",
        links: [
            { name: "Project page", url: "https://kim-youwang.github.io/neuface" },
            { name: "Paper", url: "https://openreview.net/forum?id=zVDMh6JvWc" },
            { name: "Code", url: "https://github.com/kaist-ami/NeuFace" }
        ]
    },
    {
        image: "./media/paint_it.jpg",
        title: "Paint-it: Text-to-Texture Synthesis via Deep Convolutional Texture Map Optimization and Physically-Based Rendering",
        authors: "<u>Kim Youwang</u>, Tae-Hyun Oh, Gerard Pons-Moll",
        venue: "CVPR 2024",
        links: [
            { name: "Project page", url: "https://kim-youwang.github.io/paint-it" },
            { name: "Paper", url: "https://arxiv.org/abs/2312.11360" },
            { name: "Video", url: "https://youtu.be/uSKK-ekVJLg" },
            { name: "Code", url: "https://github.com/kaist-ami/paint-it" },
            { name: "Poster", url: "https://www.dropbox.com/scl/fi/4plpanxqy0lo16d3d8t8p/cvpr24_poster_youwang_final.pdf?rlkey=gah19krwju0clqdsep6g3qd4w&st=x831q8a5&dl=0" }
        ]
    },
    {
        image: "./media/metta.gif",
        title: "MeTTA: Single-View to 3D Textured Mesh Reconstruction with Test-Time Adaptation",
        authors: "Kim Yu-Ji, Hyunwoo Ha, <u>Kim Youwang</u>, Jaeheung Surh, Hyowon Ha, Tae-Hyun Oh",
        venue: "BMVC 2024 - <span style=\"color:#c00000;\">Best Poster Award</span>",
        links: [
            { name: "Project page", url: "https://metta3d.github.io/" }
        ]
    },
    {
        image: "./media/fprf_v2.gif",
        title: "Feed-Forward Photorealistic Style Transfer for Large-Scale 3D Neural Radiance Fields",
        authors: "GeonU Kim, <u>Kim Youwang</u>, Tae-Hyun Oh",
        venue: "AAAI 2024",
        links: [
            { name: "Project page", url: "https://kim-geonu.github.io/FPRF/" },
            { name: "Paper", url: "https://arxiv.org/abs/2401.05516" },
            { name: "Code", url: "https://github.com/kaist-ami/FPRF" }
        ]
    },
    {
        image: "./media/rank_pruning.jpg",
        title: "Multi-stage Adaptive Rank Statistic Pruning for Lightweight Human 3D Mesh Recovery Model",
        authors: "Dong Hun Ryou, <u>Kim Youwang</u>, Tae-Hyun Oh",
        venue: "The Visual Computer Journal (TVCJ) 2023",
        links: [
            { name: "Paper", url: "https://link.springer.com/article/10.1007/s00371-023-02798-x" }
        ]
    },
    {
        image: "./media/clip_actor.gif",
        title: "CLIP-Actor: Text-Driven Recommendation and Stylization for Animating Human Meshes",
        authors: "<u>Kim Youwang</u>*, Kim Ji-Yeon*, Tae-Hyun Oh",
        venue: "ECCV 2022",
        links: [
            { name: "Project page", url: "https://clip-actor.github.io" },
            { name: "Paper", url: "https://arxiv.org/abs/2206.04382" },
            { name: "Video", url: "https://youtu.be/oWr4NP-eVLY" },
            { name: "Code", url: "https://github.com/kaist-ami/CLIP-Actor" },
            { name: "Poster", url: "https://www.dropbox.com/s/8l2jvvc0po6szn7/3229-poster.pdf?dl=0" }
        ]
    },
    {
        image: "./media/fastmetro_teaser.jpg",
        title: "FastMETRO: Cross-Attention of Disentangled Modalities for 3D Human Mesh Recovery with Transformers",
        authors: "Junhyeong Cho, <u>Kim Youwang</u>, Tae-Hyun Oh",
        venue: "ECCV 2022",
        links: [
            { name: "Project page", url: "https://fastmetro.github.io/" },
            { name: "Paper", url: "https://arxiv.org/abs/2207.13820" },
            { name: "Code", url: "https://github.com/kaist-ami/FastMETRO" },
            { name: "Poster", url: "https://www.dropbox.com/s/kzmihz488qcelxi/2116-poster.pdf?dl=0" }
        ]
    },
    {
        image: "./media/demr.jpg",
        title: "Unified 3D Mesh Recovery of Humans and Animals by Learning Animal Exercise",
        authors: "<u>Kim Youwang</u>, Kim Ji-Yeon, Kyungdon Joo, Tae-Hyun Oh",
        venue: "BMVC 2021",
        links: [
            { name: "Project page", url: "https://demr-bmvc21.github.io" },
            { name: "Paper", url: "https://www.bmvc2021-virtualconference.com/assets/papers/0926.pdf" }
        ]
    }
];

// ============================================
// Rendering
// ============================================
function renderPublications() {
    const container = document.getElementById('publication-list');
    let html = '';

    publicationsData.forEach(item => {
        const titleHtml = `<span class="title" style="display: block; margin-bottom: 5px;"><b>${item.title}</b></span>`;
        const venueHtml = item.venue
            ? `<span style="display: block; margin-bottom: 5px;"><i>${item.venue}</i></span>`
            : '';
        const authorsHtml = item.authors
            ? `<span class="pub-authors">${item.authors}</span><br/>`
            : '<br>';

        let linksHtml = '';
        if (item.links && item.links.length > 0) {
            const linkItems = item.links.map(link =>
                `<a href="${link.url}" target="_blank">${link.name}</a>`
            );
            linksHtml = `<span style="display: block; margin-bottom: 8px;">${linkItems.join(' | ')}</span>`;
        }

        const noteHtml = item.note
            ? `<small style="color:gray; display: block; margin-bottom: 0;">${item.note}</small>`
            : '';

        html += `
        <div class="item">
            <img src="${item.image}" alt="teaser"/>
            <p>
                ${titleHtml}
                ${venueHtml}
                ${authorsHtml}
                ${linksHtml}
                ${noteHtml}
            </p>
        </div>`;
    });

    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderPublications);
