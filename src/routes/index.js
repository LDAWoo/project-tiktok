//layouts
import { HeaderOnly } from '@/layouts'

// routesConfig
import config from '@/config'

// Pages
import Home from '@/pages/Home/Home'
import Following from '@/pages/Following'

import Upload from '@/pages/Upload'
import Profile from '@/pages/Profile'
import Live from '@/pages/Live/Live'

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly }
]

const privateRoutes = [

];

export { publicRoutes, privateRoutes };