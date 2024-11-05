interface PageProps {
    params: {
      dynamic: string;
    };
  }
  
  export default function Page({ params }: PageProps) {
    const { dynamic } = params;
  
    return (
      <div>
        <h1 className="bg-white">This is setting for {dynamic}</h1>
      </div>
    );
  }
  