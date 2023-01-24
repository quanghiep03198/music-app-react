import AppProvider from "@/context/AppProvider"
import { useState } from "react"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import tw from "tailwind-styled-components"
import Loading from "../customs/Atomics/Loading"
import ErrorBoundary from "../customs/ErrorBoundary"
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
                <AppProvider>
                    <ContentWrapper>
                        <Navbar />
                        <PageContent>
                            <Suspense
                                fallback={
                                    <div className="flex items-center justify-center p-20">
                                        <Loading />
                                    </div>
                                }
                            >
                                <Outlet />
                            </Suspense>
                        </PageContent>

                        <AudioPlayer />
                    </ContentWrapper>
                </AppProvider>

                <Sidebar />
            </LayoutWrapper>
        </ErrorBoundary>
    )
}

export default Layout
