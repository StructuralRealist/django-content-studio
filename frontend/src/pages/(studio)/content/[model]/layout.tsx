import { Outlet, useParams } from "react-router";

export function ModelListLayout() {
  const { model: appLabel } = useParams<{ model: string }>();

  return (
    <div className="contents" key={appLabel}>
      <Outlet />
    </div>
  );
}
