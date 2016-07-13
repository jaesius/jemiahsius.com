jQuery(document).ready(function($){
  window.addEventListener('scroll', function(e){
    if(window.scrollY > 65){
      $('.navbar').addClass('navbar-bg static-nav');
    }else{
      $('.navbar').removeClass('navbar-bg static-nav');
    }
  });
});
