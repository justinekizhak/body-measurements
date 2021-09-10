import AppHeader from "~/components/AppHeader";
import AppFooter from "~/components/AppFooter";

export default (props) => {
  return (
    <div class="flex flex-col min-h-screen ">
      <AppHeader />
      <main class="flex-grow">{props.children}</main>
      <AppFooter />
    </div>
  );
};
