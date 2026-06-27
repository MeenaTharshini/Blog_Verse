function MainLayout({ children }) {
  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
}

export default MainLayout;