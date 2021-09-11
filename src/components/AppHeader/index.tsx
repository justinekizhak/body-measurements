import fullLogo from "~/assets/svg/full-logo.svg";
import { MenuProps, MobileMenuHandler } from "~/interfaces/header";
import CallToAction from "./CallToAction";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import gsap from "gsap";
import { createSignal, onMount } from "solid-js";

export default () => {
  const navItems = [
    {
      label: "Your Profile",
      href: "#",
    },
    {
      label: "Settings",
      href: "#",
    },
    {
      label: "Sign out",
      href: "#",
    },
  ];

  const menuProps: MenuProps = {
    user: {
      email: "test@email.com",
      name: "test",
      photo:
        "https://i.pinimg.com/originals/43/19/33/43193307f77a5d04a1dbddeca94c72f2.png",
    },
    navItems,
  };

  const [mobileMenuHeight, setMobileMenuHeight] = createSignal(0);

  let mobileMenuContent;

  const handleMobileMenuToggle = (data: MobileMenuHandler) => {
    const height = mobileMenuHeight();
    if (data.openMenu) {
      // Opening
      gsap.fromTo(mobileMenuContent, { height: 0 }, { height });
    } else {
      // Closing
      gsap.fromTo(mobileMenuContent, { height }, { height: 0 });
    }
  };

  onMount(() => {
    const height = mobileMenuContent.offsetHeight;
    setMobileMenuHeight(height);
    gsap.set(mobileMenuContent, { height: 0 });
  });

  return (
    <header>
      <nav class=" shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <img
                  class="block lg:hidden h-8 w-auto"
                  src={fullLogo}
                  alt="BM logo"
                />
                <img
                  class="hidden lg:block h-8 w-auto"
                  src={fullLogo}
                  alt="BM logo"
                />
              </div>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
              <CallToAction />
              <div class="ml-3 relative">
                <DesktopMenu {...menuProps} />
              </div>
            </div>
            <MobileMenuButton onChange={handleMobileMenuToggle} />
          </div>
        </div>
        <div class="lg:hidden">
          <CallToAction />
        </div>
        <div ref={mobileMenuContent} class="overflow-hidden lg:hidden">
          <MobileMenu {...menuProps} />
        </div>
      </nav>
    </header>
  );
};
