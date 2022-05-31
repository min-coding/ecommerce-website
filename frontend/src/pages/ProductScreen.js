import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductScreen() {
  const { slug } = useParams();
  return (
    <div>
      <h2> {slug}</h2>
    </div>
  );
}
