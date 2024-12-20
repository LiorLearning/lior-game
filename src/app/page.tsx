import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <p>Hello World!</p>
    </Suspense>
  );
}
