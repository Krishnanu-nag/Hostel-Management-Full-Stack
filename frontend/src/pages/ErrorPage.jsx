import MainLayout from "../layout/MainLayout";
import "./ErrorPage.css";
function ErrorPage() {
  return (
    <>
      <MainLayout>
        <div className="error-container">
          <h1 className="error-code">Error 404</h1>
          <p className="error-message">Oops! Page not found.</p>
        </div>
      </MainLayout>
    </>
  );
}
export default ErrorPage;
