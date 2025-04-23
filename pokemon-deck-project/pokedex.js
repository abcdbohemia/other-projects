document.addEventListener('DOMContentLoaded', () => {
        //select all flip boxes
        const flipBoxes = document.querySelectorAll('.flip-box');
        //Check if any flip boxes exist to avoid unecessary processing
        if (flipBoxes.length === 0) {
            console.warn('No flip boxes found on the page.');
            return;
        }
        //Add click event listener to each flip box 
        flipBoxes.forEach((box, index) => {
            box.addEventListener('click', () =>
            {
                //find the inner element within the clicked box
                const inner = box.querySelector('.flip-box-inner');
                if (!inner) {
                console.error(`Flip box ${index} does not contain a .flip-box-inner element.`);
                return;
                }
                //Toggle the 'flipped' class to trigger the flip effect
                inner.classList.toggle('flipped');
                //Optional: log the flip action for debugging
                console.log(`Flip box ${index} flipped. Now $ {inner.classList.contains('flipped) ? 'showing back' : 'showing front'}.`);
            });    
        });
        //Optional: Add a global "reset" funcyionality (clicking the h1 to flip all cards back)
        const heading = document.querySelector('h1');
        if (heading) { 
            heading.addEventListener('click', () => {
                flipBoxes.forEach((box) => {
                    const inner = box.querySelector('.flip-box-inner');
                    if (inner && inner.classList.contains('flipped')) {
                        inner.classList.remove('flipped');
                    }
                });
            console.log('All flip boxes reset to front.');
            });
        }
});
