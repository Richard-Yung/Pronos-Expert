

    // ------ Modal video open/close ------
    const openBtn = document.getElementById('openVideo');
    const modal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const ytFrame = document.getElementById('ytFrame');

    function openVideoModal(){
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      // autoplay already in iframe src (replace VIDEO_ID server-side)
    }
    function closeVideoModal(){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      // stop video: reset src
      const src = ytFrame.src;
      ytFrame.src = src.replace('&autoplay=1','');
      // small delay to fully stop
      setTimeout(()=> ytFrame.src = src, 50);
    }

    openBtn && openBtn.addEventListener('click', openVideoModal);
    closeModal && closeModal.addEventListener('click', closeVideoModal);
    modal.addEventListener('click', (e)=> { if(e.target === modal) closeVideoModal() });

    // ------ Request notification permission (lightweight and optional) ------
    (function(){
      if('Notification' in window){
        try{
          Notification.requestPermission().then(p => {
            if(p === 'granted'){
              // show one friendly notification after 3s
              setTimeout(()=> new Notification('Rejoins le canal Pronos Expert pour des pronos quotidiens !'), 3000);
            }
          });
        }catch(e){ /* ignore */ }
      }
    })();

    // ------ Minimal keyboard accessibility for modal ------
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && modal.classList.contains('open')) closeVideoModal();
    });

    