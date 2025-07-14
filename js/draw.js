// Lấy các phần tử DOM cần thiết cho chức năng vẽ
const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

// Biến toàn cục lưu trạng thái vẽ và tuỳ chọn hiện tại
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false, // Đang vẽ hay không
    selectedTool = "brush", // Công cụ hiện tại
    brushWidth = 5, // Độ lớn nét vẽ
    selectedColor = "#000"; // Màu vẽ hiện tại

// Hàm đặt nền trắng cho canvas (giúp khi lưu ảnh nền không bị trong suốt)
const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; // Đặt lại màu vẽ về màu đã chọn
}

// Khi trang tải xong, thiết lập kích thước canvas và nền trắng
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

// Vẽ hình chữ nhật
const drawRect = (e) => {
    // Nếu không chọn fill thì chỉ vẽ viền, ngược lại vẽ hình đặc
    if(!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

// Vẽ hình tròn
const drawCircle = (e) => {
    ctx.beginPath(); // Bắt đầu vẽ đường tròn mới
    // Tính bán kính dựa vào vị trí chuột
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // Vẽ đường tròn
    fillColor.checked ? ctx.fill() : ctx.stroke(); // Nếu chọn fill thì tô, không thì chỉ vẽ viền
}

// Vẽ hình tam giác
const drawTriangle = (e) => {
    ctx.beginPath(); // Bắt đầu vẽ tam giác mới
    ctx.moveTo(prevMouseX, prevMouseY); // Đỉnh đầu tiên
    ctx.lineTo(e.offsetX, e.offsetY); // Đỉnh thứ hai
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // Đỉnh thứ ba (đối xứng)
    ctx.closePath(); // Đóng đường vẽ tam giác
    fillColor.checked ? ctx.fill() : ctx.stroke(); // Nếu chọn fill thì tô, không thì chỉ vẽ viền
}

// Khi bắt đầu nhấn chuột để vẽ
const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // Lưu vị trí chuột ban đầu
    prevMouseY = e.offsetY;
    ctx.beginPath(); // Bắt đầu đường vẽ mới
    ctx.lineWidth = brushWidth; // Đặt độ lớn nét vẽ
    ctx.strokeStyle = selectedColor; // Đặt màu viền
    ctx.fillStyle = selectedColor; // Đặt màu tô
    // Lưu lại trạng thái canvas hiện tại để khi kéo chuột sẽ không bị vẽ đè
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Khi di chuyển chuột để vẽ
const drawing = (e) => {
    if(!isDrawing) return; // Nếu không phải đang vẽ thì thoát
    ctx.putImageData(snapshot, 0, 0); // Phục hồi lại trạng thái canvas trước khi vẽ tiếp

    if(selectedTool === "brush" || selectedTool === "eraser") {
        // Nếu là tẩy thì vẽ bằng màu trắng, còn lại dùng màu đã chọn
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // Vẽ đường từ điểm trước đến điểm hiện tại
        ctx.stroke(); // Thực hiện vẽ
    } else if(selectedTool === "rectangle"){
        drawRect(e);
    } else if(selectedTool === "circle"){
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
}

// Xử lý sự kiện chọn công cụ vẽ
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

// Thay đổi độ lớn nét vẽ khi kéo slider
sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

// Xử lý chọn màu vẽ
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

// Chọn màu tuỳ ý bằng color picker
colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

// Xoá toàn bộ canvas
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});

// Lưu ảnh đã vẽ về máy
saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
});

// Bắt sự kiện chuột cho canvas
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);