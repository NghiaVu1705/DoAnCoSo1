// Hàm để gửi yêu cầu AJAX và nhận dữ liệu món ăn từ Flask
function getMenuItems() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var menuItems = JSON.parse(this.responseText);
            populateMenu(menuItems); // Gọi hàm populateMenu() với dữ liệu món ăn nhận được
        }
    };
    xhr.open("GET", "/get_menu_items", true);
    xhr.send();
}

// Hàm để tạo các dòng mã HTML cho mỗi món ăn và thêm chúng vào bảng
function populateMenu(menuItems) {
    var table = document.getElementById("mathang"); // Lấy bảng dựa trên id

    menuItems.forEach(function(item, index) {
        var row = table.insertRow(index + 1); // Chèn dòng mới vào bảng

        // Thêm tên món ăn vào ô đầu tiên của dòng
        var nameCell = row.insertCell(0);
        nameCell.innerHTML = item.name;

        // Thêm giá vào ô thứ hai của dòng
        var priceCell = row.insertCell(1);
        priceCell.innerHTML = "$" + item.price.toFixed(2);

        // Thêm nút thêm vào giỏ hàng vào ô thứ ba của dòng
        var actionCell = row.insertCell(2);
        actionCell.innerHTML = '<input type="button" onclick="addItem(' + index + ')" value="Thêm" />';
    });
}

// Gọi hàm getMenuItems() khi trang đã tải xong
window.onload = getMenuItems;
