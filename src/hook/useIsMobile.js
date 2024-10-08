import { useTheme } from "@emotion/react"
import { useMediaQuery } from "@mui/material"

const useIsMobile = () => {
  return useMediaQuery((theme) => theme.breakpoints.down('sm'))
}
export default useIsMobile