import ResultRow from "./ResultRow";

export default function LoadingSkeleton() {
  return (
    <>
      <ResultRow loading={true} />
      <ResultRow loading={true} />
      <ResultRow loading={true} />
      <ResultRow loading={true} />
    </>
  );
}