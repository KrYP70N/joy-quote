import Container from "../container/container.component";

export default function Footer() {
  return (
    <footer>
      <Container attr="bg-gradient-to-r from-primary to-secondary">
        <p className="text-center text-light">COPYRIGHT &copy; {new Date().getFullYear()}. All right reserved, powered by Joy Groups International</p>
      </Container>
    </footer>
  )
}