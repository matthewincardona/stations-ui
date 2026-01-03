export default function JobsLayout({
  children,
  modal,
}: {
  children: React.ReactNode; // main page
  modal: React.ReactNode; // modal slot
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
