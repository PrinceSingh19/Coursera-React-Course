import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./Home";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import Dishdetail from "./Dishdetail";
import Contact from "./Contact";
import Aboutus from "./Aboutus";

import { getDishes } from "../redux/stateSlices/dishesSlice";
import { getPromos } from "../redux/stateSlices/promotionsSlice";
import { getComments } from "../redux/stateSlices/commentsSlice";
import { getLeaders } from "../redux/stateSlices/leadersSlice";

function Main() {
	const { dishes } = useSelector((state) => state.dishes);
	const { leaders } = useSelector((state) => state.leaders);
	const { promotions } = useSelector((state) => state.promotions);
	const { comments } = useSelector((state) => state.comments);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(getDishes());
		dispatch(getPromos());
		dispatch(getComments());
		dispatch(getLeaders());
		//eslint-disable-next-line
	}, []);

	const DishWithId = () => {
		let { dishId } = useParams(); // getting id of the selected dish on Menu page
		return (
			<Dishdetail
				dish={dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
				comments={comments.filter((comment) => comment.dishId === parseInt(dishId, 10))}
			/>
		);
	};

	return (
		<div>
			<Header />
			<AnimatePresence initial={false} mode="sync">
				{" "}
				{/* // using AnimatePresence to apply the animation on page transition */}
				<Routes location={location} key={location.pathname}>
					<Route
						path="/home"
						element={
							<Home
								dish={dishes.filter((dish) => dish.featured)[0]}
								promotion={promotions.filter((promo) => promo.featured)[0]}
								leader={leaders.filter((leader) => leader.featured)[0]}
							/>
						}
					/>
					<Route exact path="/menu" element={<Menu dishes={dishes} />} />
					<Route exact path="/menu/:dishId" element={<DishWithId />} />
					<Route path="/contactus" element={<Contact />} />
					<Route path="/aboutus" element={<Aboutus leaders={leaders} />} />
					<Route path="/" element={<Navigate replace to="/home" />} />
				</Routes>
			</AnimatePresence>
			<Footer />
		</div>
	);
}

export default Main;
