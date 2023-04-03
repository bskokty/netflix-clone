import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { collection, getDocs, getDoc, addDoc, doc, auth } from "../../firebase";
import db from "../../firebase";
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";
import { QuerySnapshot, onSnapshot, query, where } from "firebase/firestore";

function PlansScreen() {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);

  // useEffect(() => {

  //   const getProducts = async () => {
  //     const q = query(collection(db, "products"), where("active", "==", true));
  //     const querySnapshot = await getDocs(q);
  //     const products = {};
  //     querySnapshot.forEach(async (productDoc) => {
  //       products[productDoc.id] = productDoc.data();
  //       const priceSnap = await getDocs(
  //         collection(db, `products/${productDoc.id}/prices`)
  //       );
  //       priceSnap.docs.forEach((price) => {
  //         products[productDoc.id].prices = {
  //           priceId: price.id,
  //           priceData: price.data(),
  //         };
  //       });
  //     });
  //     setProducts(products);
  //   };
  //   getProducts();
  // }, []);

  useEffect(() => {
    // db.collection("customers")
    //   .doc("subscriptions")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach(async (subscription) => {
    //       setSubscription({
    //         role: subscription.data().role,
    //       });
    //     });
    //   });
    const fetchCustomerWithSubscriptions = async () => {
      const customersCollection = doc(db, "customers", user.uid);

      const customerDoc = await getDoc(customersCollection);

      if (!customerDoc.exists()) {
        console.log("No matching documents.");
        return null;
      }

      const subscriptionsRef = collection(customersCollection, "subscriptions");
      const subscriptionsSnapshot = await getDocs(subscriptionsRef);

      const subscriptionsData = subscriptionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (subscriptionsData && subscriptionsData[0]) {
        setSubscription({
          role: subscriptionsData[0].role,
          current_period_end: subscriptionsData[0].current_period_end.seconds,
          current_period_start:
            subscriptionsData[0].current_period_start.seconds,
        });
      }
    };
    fetchCustomerWithSubscriptions();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const snapshot = await getDocs(productsCollection);
      const data = snapshot.docs.map(async (doc) => {
        const priceSnap = await getDocs(collection(doc.ref, "prices"));
        const priceData = priceSnap.docs.map((price) => ({
          priceId: price.id,
          priceData: price.data(),
        }));
        return {
          id: doc.id,
          ...doc.data(),
          prices: priceData,
        };
      });
      const resolvedData = await Promise.all(data);
      setProducts(resolvedData);
    };

    fetchProducts();
  }, []);

  const loadCheckOut = async (priceId) => {
    const docRef = await addDoc(
      collection(doc(db, "customers", user.uid), "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    console.log(docRef);

    if (docRef && typeof docRef.id === "string") {
      onSnapshot(
        doc(db, "customers", user.uid, "checkout_sessions", docRef.id),
        async (snap) => {
          const { error, sessionId } = snap.data();
          if (error) {
            alert(`An error occurred: ${error.message}`);
          }
          if (sessionId) {
            const stripe = await loadStripe(
              "pk_test_51IEI5GL98KWk4ZghR8ktgGjNAzsWR4uwsWDiTzAmgWmLpX0oTkHsKWoVGS7oCqcn09AKVjbm8SiDoMqnPoYnSRti00ojC5VfIM"
            );
            stripe.redirectToCheckout({ sessionId });
          }
        }
      );
    }
  };

  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role.toLowerCase());
        console.log(productData.name);
        console.log(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen__plan--disabled"
            } planScreen__plan`}
          >
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckOut(productData.prices[0].priceId)
              }
            >
              {isCurrentPackage ? "CurrentPackage" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
