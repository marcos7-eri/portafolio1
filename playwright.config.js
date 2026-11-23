import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'tests/e2e', workers:1, use:{baseURL:'http://127.0.0.1:3100'},
  webServer:[
    {command:'npm run dev --prefix backend',url:'http://127.0.0.1:3101/api/health',env:{PORT:'3101',DB_FILE:`./data/e2e-${process.pid}.sqlite`},reuseExistingServer:false},
    {command:'npm run dev --prefix frontend',url:'http://127.0.0.1:3100',env:{PORT:'3100',API_INTERNAL_URL:'http://127.0.0.1:3101'},reuseExistingServer:false}
  ]
});
