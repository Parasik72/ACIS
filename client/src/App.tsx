import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import styles from './App.module.scss';
import { Main } from "./components/Main/Main";
import { Person } from "./components/Person/Person";
import { EmployeeAppointment } from "./components/EmployeeAppointment/EmployeeAppointment";
import { EmployeePosition } from "./components/EmployeePosition/EmployeePosition";
import { Company } from "./components/Company/Company";
import { Manufactory } from "./components/Manufactory/Manufactory";
import { Area } from "./components/Area/Area";
import { Brigade } from "./components/Brigade/Brigade";
import { Product } from "./components/Product/Product";
import { ProductCategory } from "./components/ProductCategory/ProductCategory";
import { Attribute } from "./components/Attribute/Attribute";
import { Polygon } from "./components/Polygon/Polygon";
import { Test } from "./components/Test/Test";
import { Equipment } from "./components/Equipment/Equipment";
import { ProductMovementAccounting } from "./components/ProductMovementAccounting/ProductMovementAccounting";
import { AreaBrigadeProduct } from "./components/AreaBrigadeProduct/AreaBrigadeProduct";
import { ListOfProductsOfASeparateCategory } from "./components/ProceduresFunctions/ListOfProductsOfASeparateCategory";
import { ListOfProductsOfASeparateCategoryCertinTimeQuantity } from "./components/ProceduresFunctions/ListOfProductsOfASeparateCategoryCertinTimeQuantity";
import { ListOfProductsOfASeparateCategoryCertinTime } from "./components/ProceduresFunctions/ListOfProductsOfASeparateCategoryCertinTime";
import { ListOfWorkers } from "./components/ProceduresFunctions/ListOfWorkers";
import { ListOfAreasQuantity } from "./components/ProceduresFunctions/ListOfAreasQuantity";
import { ListOfAreas } from "./components/ProceduresFunctions/ListOfAreas";
import { BrigadeCompositions } from "./components/ProceduresFunctions/BrigadeCompositions";
import { ListOfWorks } from "./components/ProceduresFunctions/ListOfWorks";
import { ListOfMasters } from "./components/ProceduresFunctions/ListOfMasters";
import { ListOfProductsOfASeparateCategoryCollectsNow } from "./components/ProceduresFunctions/ListOfProductsOfASeparateCategoryCollectsNow";
import { BrigadeCompositionCollectsProduct } from "./components/ProceduresFunctions/BrigadeCompositionCollectsProduct";
import { ListOfPolygonsTestingProduct } from "./components/ProceduresFunctions/ListOfPolygonsTestingProduct";
import { ListOfProductsOfASeparateCategoryTestingInPolygons } from "./components/ProceduresFunctions/ListOfProductsOfASeparateCategoryTestingInPolygons";
import { ListOfTestersTestingProduct } from "./components/ProceduresFunctions/ListOfTestersTestingProduct";
import { ListOfEquipmentUsingTest } from "./components/ProceduresFunctions/ListOfEquipmentUsingTest";
import { ListOfProductsCollectsNowQuantity } from "./components/ProceduresFunctions/ListOfProductsCollectsNowQuantity";
import { ListOfProductsCollectsNow } from "./components/ProceduresFunctions/ListOfProductsCollectsNow";
import { PositionAttribute } from "./components/PositionAttribute/PositionAttribute";
import { TestEmployeeAppointment } from "./components/TestEmployeeAppointment/TestEmployeeAppointment";
import { TestEquipment } from "./components/TestEquipment/TestEquipment";
import { ManufactoryPolygon } from "./components/ManufactoryPolygon/ManufactoryPolygon";

export const App = () => {
  return (
	<div className={styles.app}>
		<Navbar />
		<Routes>
			<Route path={'/'} element={<Main />}/>
			<Route path={'/person'} element={<Person />}/>
			<Route path={'/employee-appointment'} element={<EmployeeAppointment />}/>
			<Route path={'/employee-position'} element={<EmployeePosition />}/>
			<Route path={'/company'} element={<Company />}/>
			<Route path={'/manufactory'} element={<Manufactory />}/>
			<Route path={'/area'} element={<Area />}/>
			<Route path={'/brigade'} element={<Brigade />}/>
			<Route path={'/product'} element={<Product />}/>
			<Route path={'/product-category'} element={<ProductCategory />}/>
			<Route path={'/attribute'} element={<Attribute />}/>
			<Route path={'/polygon'} element={<Polygon />}/>
			<Route path={'/test'} element={<Test />}/>
			<Route path={'/equipment'} element={<Equipment />}/>
			<Route path={'/product-movement-accounting'} element={<ProductMovementAccounting />}/>
			<Route path={'/area-brigade-product'} element={<AreaBrigadeProduct />}/>
			<Route path={'/position-attribute'} element={<PositionAttribute />}/>
			<Route path={'/test-employee-appointment'} element={<TestEmployeeAppointment />}/>
			<Route path={'/test-equipment'} element={<TestEquipment />}/>
			<Route path={'/manufactory-polygon'} element={<ManufactoryPolygon />}/>
			<Route path={'/list-of-products-of-a-separate-category'} element={<ListOfProductsOfASeparateCategory />}/>
			<Route path={'/list-of-products-of-a-separate-category-certin-time-quantity'} element={<ListOfProductsOfASeparateCategoryCertinTimeQuantity />}/>
			<Route path={'/list-of-products-of-a-separate-category-certin-time'} element={<ListOfProductsOfASeparateCategoryCertinTime />}/>
			<Route path={'/list-of-workers'} element={<ListOfWorkers />}/>
			<Route path={'/list-of-areas-quantity'} element={<ListOfAreasQuantity />}/>
			<Route path={'/list-of-areas'} element={<ListOfAreas />}/>
			<Route path={'/list-of-works'} element={<ListOfWorks />}/>
			<Route path={'/brigade-compositions'} element={<BrigadeCompositions />}/>
			<Route path={'/list-of-masters'} element={<ListOfMasters />}/>
			<Route path={'/list-of-products-of-a-separate-category-collects-now'} element={<ListOfProductsOfASeparateCategoryCollectsNow />}/>
			<Route path={'/brigade-composition-collects-product'} element={<BrigadeCompositionCollectsProduct />}/>
			<Route path={'/list-of-polygons-testing-product'} element={<ListOfPolygonsTestingProduct />}/>
			<Route path={'/list-of-products-of-a-separate-category-testing-in-polygons'} element={<ListOfProductsOfASeparateCategoryTestingInPolygons />}/>
			<Route path={'/list-of-testers-testing-product'} element={<ListOfTestersTestingProduct />}/>
			<Route path={'/list-of-equipment-using-test'} element={<ListOfEquipmentUsingTest />}/>
			<Route path={'/list-of-products-collects-now-quantity'} element={<ListOfProductsCollectsNowQuantity />}/>
			<Route path={'/list-of-products-collects-now'} element={<ListOfProductsCollectsNow />}/>
			<Route
				path="*"
				element={<Navigate to="/" replace />}
			/>
		</Routes>
	</div>
  );
};
