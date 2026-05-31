const imageInput = document.getElementById("imageInput");
const formatSelect = document.getElementById("formatSelect");
const convertBtn = document.getElementById("convertBtn");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");

convertBtn.addEventListener("click", () => {

    const file = imageInput.files[0];

    if (!file) {
        alert("이미지를 선택해주세요.");
        return;
    }

    const img = new Image();

    img.onload = () => {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const format = formatSelect.value;
        const mimeType = `image/${format}`;

        canvas.toBlob((blob) => {

            const url = URL.createObjectURL(blob);

            preview.src = url;
            preview.style.display = "block";

            downloadBtn.href = url;
            downloadBtn.download = `converted.${format}`;
            downloadBtn.style.display = "block";

        }, mimeType, 1);

    };

    img.src = URL.createObjectURL(file);

});
