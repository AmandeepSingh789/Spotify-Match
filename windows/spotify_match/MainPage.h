#pragma once
#include "MainPage.g.h"
#include <winrt/Microsoft.ReactNative.h>

namespace winrt::spotify_match::implementation
{
    struct MainPage : MainPageT<MainPage>
    {
        MainPage();
    };
}

namespace winrt::spotify_match::factory_implementation
{
    struct MainPage : MainPageT<MainPage, implementation::MainPage>
    {
    };
}

