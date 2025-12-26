import ContentLoader from "react-content-loader";

const SkeletonLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={501}
    height={208}
    viewBox="0 0 400 160"
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect width="501" height="208" fill="white" />
    <rect x="24" y="27" width="289" height="22" rx="6" fill="#ECEBEB" />
    <rect x="24" y="147" width="398" height="34" rx="6" fill="#ECEBEB" />
    <rect x="55" y="61" width="258" height="20" rx="6" fill="#ECEBEB" />
    <rect x="24" y="61" width="24" height="20" rx="6" fill="#ECEBEB" />
  </ContentLoader>
);

export default SkeletonLoader;
