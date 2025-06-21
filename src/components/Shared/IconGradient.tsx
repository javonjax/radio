{
  /* 
  Use this to set lucide icon fill and stroke.
              ie.
                  fill="url(#accent-gradient-stroke)"
                  stroke="url(#accent-gradient-stroke)"
                  strokeWidth={2} 
*/
}

const IconGradient = () => {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="accent-gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(62.3% 0.214 259.815)" />
          <stop offset="100%" stopColor="oklch(71.5% 0.143 215.221)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconGradient;
