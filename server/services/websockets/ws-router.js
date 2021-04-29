export default function wsRouter(data, conn, connections) {
  console.log(`
  data: ${JSON.stringify(data)}
  conn: ${JSON.stringify(conn)}
  connections:  ${JSON.stringify(connections)}
  `)
}
