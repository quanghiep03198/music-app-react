import { Suspense, useState, useTransition } from "react"
import { Outlet } from "react-router-dom"
import tw from "tailwind-styled-components"
import AppProvider from "../../context/AppProvider"
import ErrorBoundary from "../customs/ErrorBoundary"
import Loading from "../customs/Atomics/Loading"
import AudioPlayer from "../shared/AudioPlayer"
import Navbar from "../shared/Navbar"
import Sidebar from "../shared/Sidebar"

const LayoutWrapper = tw.div`drawer drawer-mobile `
const ContentWrapper = tw.div`invisible-scroll drawer-content relative flex h-screen w-full flex-col justify-between overflow-x-auto overflow-y-auto`
const PageContent = tw.div`flex flex-col justify-between w-full h-full gap-10 overflow-y-auto scroll bg-base-100 p-6 xxl:p-10`
const SidebarToggler = tw.input`drawer-toggle`

const Layout = () => {
    return (
        <ErrorBoundary>
            <LayoutWrapper data-theme="dracula">
                <SidebarToggler id="sidebar-toggle" type="checkbox" />
                <ContentWrapper>
                    <Navbar />

                    {/* <AppProvider></AppProvider> */}
                    <PageContent>
                        <Suspense
                            fallback={
                                <div className="flex items-center justify-center p-10">
                                    <Loading />
                                </div>
                            }
                        >
                            <Outlet />
                        </Suspense>
                    </PageContent>

                    <AudioPlayer />
                </ContentWrapper>

                <Sidebar />
            </LayoutWrapper>
        </ErrorBoundary>
    )
}

export default Layout
