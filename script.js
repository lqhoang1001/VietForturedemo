document.addEventListener("DOMContentLoaded", function () {
    console.log("Trang đã tải xong!");

    // Ví dụ: Hiệu ứng nút bấm
    const btn = document.querySelector("#myButton");
    if (btn) {
        btn.addEventListener("click", function () {
            alert("Bạn vừa bấm nút!");
        });
    }

    // Ví dụ: Validate form
    const form = document.querySelector("#contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn submit mặc định

            let name = document.querySelector("#name").value.trim();
            let email = document.querySelector("#email").value.trim();

            if (name === "" || email === "") {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            alert("Gửi thành công!");
            form.reset();
        });
    }
});
