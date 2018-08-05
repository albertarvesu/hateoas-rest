import App from './App'

const PORT = process.env.PORT || 3000

App.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log('Express server listening on port ' + PORT)
})
