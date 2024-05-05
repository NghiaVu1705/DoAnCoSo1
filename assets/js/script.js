//Lấy nút
var mybutton = document.getElementById("myBtn");

// Khi người dùng cuộn xuống 20px từ đầu tài liệu, hiển thị nút
window.onscroll = function() {scrollFunction()};

function scrollFunction() 
{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) 
        mybutton.style.display = "block";
    else 
        mybutton.style.display = "none";
}

function topFunction() 
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


   

