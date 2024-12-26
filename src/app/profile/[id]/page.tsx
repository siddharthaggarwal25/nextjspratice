export default async function UserProfile({ params }: any) {
    console.log(  "params ++"  , params)
  const { id } = await params;
  return <p>ID: {id}</p>;
}
