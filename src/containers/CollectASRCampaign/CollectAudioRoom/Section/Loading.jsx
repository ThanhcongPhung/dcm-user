import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';

function Loading({ loading }) {
  const [color] = useState('#ff4f5e');

  return (
    <div className="sweet-loading">
      <BeatLoader color={color} loading={loading} size={15} />
    </div>
  );
}

export default Loading;
