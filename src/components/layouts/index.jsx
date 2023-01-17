import { Outlet } from "react-router-dom";
import tw from "tailwind-styled-components";
import AppProvider from "../context/AppProvider";
import AudioPlayer from "../shared/AudioPlayer";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

const DrawerLayout = tw.div`drawer drawer-mobile `;
const DrawerContentWrapper = tw.div`invisible-scroll drawer-content relative flex h-screen w-full flex-col justify-between overflow-x-auto overflow-y-auto`;
const PageContent = tw.div`flex flex-col justify-between w-full h-full gap-10 overflow-y-auto invisible-scroll bg-base-100`;
const SidebarToggler = tw.input`drawer-toggle`;
import { Suspense, lazy } from "react";
import Loading from "../shared/Atomics/Loading";
import { BsTextCenter } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";

const Layout = () => {
	return (
		<AppProvider>
			<DrawerLayout data-theme="dracula">
				<SidebarToggler id="sidebar-toggle" type="checkbox" />
				<DrawerContentWrapper>
					<Navbar />
					<PageContent>
						<Suspense
							fallback={
								<div className="flex w-full items-center justify-center">
									<Loading size="loading-md" />
								</div>
							}
						>
							<Outlet />
						</Suspense>
					</PageContent>
					<AudioPlayer />
				</DrawerContentWrapper>
				<Sidebar />
			</DrawerLayout>
		</AppProvider>
	);
};

export default Layout;
