export default function LoadingBar() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="#34346d"
        strokeWidth="8"
        fill="none"
        strokeDasharray="314" // 2 * π * 50 (длина окружности)
        strokeDashoffset="314"
        strokeLinecap="round"
        style={{
          animation: "loadingAnim 2s infinite linear",
        }}
      />
      <style>
        {`
            @keyframes loadingAnim {
              0% { stroke-dashoffset: 314; }
              50% { stroke-dashoffset: 157; }
              100% { stroke-dashoffset: 0; }
            }
          `}
      </style>
    </svg>
  );
}
