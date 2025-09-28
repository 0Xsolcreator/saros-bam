import { useEffect, useState } from "react"
import { SplashScreen, Stack } from "expo-router"
import { useFonts } from "@expo-google-fonts/plus-jakarta-sans"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { Toaster } from "sonner-native"

import { initI18n } from "@/i18n"
import { store } from "@/store/store"
import { ThemeProvider } from "@/theme/context"
import { customFontsToLoad } from "@/theme/typography"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { KitClientProvider } from "@/services/kit/client"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <KitClientProvider>
          <ThemeProvider>
            <KeyboardProvider>
              <GestureHandlerRootView>
                <Stack screenOptions={{ headerShown: false }} />
                <Toaster position="top-center" richColors={true} />
              </GestureHandlerRootView>
            </KeyboardProvider>
          </ThemeProvider>
        </KitClientProvider>
      </Provider>
    </SafeAreaProvider>
  )
}
