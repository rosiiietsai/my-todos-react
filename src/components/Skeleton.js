export default function Skeleton({ times }) {
  const skeleton = Array(times)
    .fill(0)
    .map((_, i) => <div key={i} className="skeleton" />);

  return skeleton;
}
