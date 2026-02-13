import Link from "next/link";

export default function GroupPage() {
  return (
    <main>
      <h1>Group Area</h1>
      <p>Any authenticated user can access this page.</p>
      <p>
        <Link href="/admin">Go to Admin</Link>
      </p>
    </main>
  );
}
