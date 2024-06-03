const { useEffect, useState } = require('react');
const { MIDTRANS_CLIENT_KEY, MIDTRANS_API_URL } = require('../utils/constant');

const useSnap = () => {
  const [snap, setSnap] = useState(null);
  const [snapShow, setSnapShow] = useState(false);

  useEffect(() => {
    const myMidtransClientKey = MIDTRANS_CLIENT_KEY;
    const script = document.createElement('script');
    script.src = `${MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute('data-client-key', myMidtransClientKey);

    script.onload = () => {
      setSnap(window.snap);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token, embedId, action) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result) {
          console.log('success', result);
          action.onSuccess(result);
        },
        onPending: function (result) {
          console.log('success', result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  const changeSnapShow = () => {
    setSnapShow((prev) => !prev);
  };

  return { snapEmbed, snapShow, setSnapShow, changeSnapShow };
};

export default useSnap;
