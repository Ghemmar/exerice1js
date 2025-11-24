document.querySelectorAll('.secret') .forEach(span => {
    span.addEventListener('click', function(){
        this.texteContent = this.dataset.cap;

    });
});