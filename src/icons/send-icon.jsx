export function SendIcon ({ size = '1em', color = 'currentColor' }) {
  return (
    <svg
      height={size}
      width={size}
      stroke={color}
      fill={color}
      strokeWidth={0}
      viewBox="0 0 512 512"
    >
      <path d="m48 448 416-192L48 64v149.333L346 256 48 298.667z" stroke="none" />
    </svg>
  )
}
