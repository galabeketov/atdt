import React, { useMemo } from "react";
import SEO from "../../common/SEO";
import Layout from "../../common/Layout";
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useFirebase } from "../../providers/firebase/FirebaseProvider";
import Spinner from "../../components/spinner/Spinner";

const Publications = () => {
  const { getDocuments, getReference, userData } = useFirebase();

  // Fetch categories
  const {
    data: categoriesData = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery(["categories"], () =>
    getDocuments({ collectionName: "categories" })
  );

  // Example if you still need categories, sorted
  const sortedCategories = useMemo(
    () => categoriesData.sort((a, b) => a - b),
    [categoriesData]
  );

  // If you need to fetch lessons by category
  const queries = sortedCategories.map((category) => ({
    queryKey: ["lessons", { categoryId: category.id }],
    queryFn: () =>
      getDocuments({
        collectionName: "lessons",
        filters: [
          {
            key: "category",
            operator: "==",
            value: getReference({
              collectionName: "categories",
              id: category.id,
            }),
          },
        ],
      }),
  }));
  const results = useQueries({ queries });

  // NEW: Fetch articles data
  const {
    data: articlesData = [],
    isLoading: isArticlesLoading,
    isError: isArticlesError,
  } = useQuery(["articles"], () =>
    getDocuments({ collectionName: "articles" })
  );

  // Combine loading states
  const isLoading = isCategoriesLoading || isArticlesLoading;

  // Combine error states
  const errorStatus = isCategoriesError || isArticlesError;

  return (
    <>
      <SEO title="Nashrlar" />
      <Layout isLoading={isLoading}>
        <BreadcrumbOne
          title="Nashrlar"
          rootUrl="/"
          parentUrl="Asosiy sahifa"
          currentUrl="Nashrlar"
        />

        {/* Admin link */}
        <div className="edu-course-area edu-section-gap bg-color-white">
          {userData?.isAdmin && (
            <div className="container d-flex justify-content-end mb-4">
              <a
                href="https://admin-edubase-lexical-playground.vercel.app/"
                target="_blank"
                className="edu-btn"
                rel="noreferrer">
                Blog qo'shish
              </a>
            </div>
          )}
        </div>

        {/* If there's an error fetching categories/articles */}
        {errorStatus && (
          <div className="container">
            <p className="text-danger">Error loading data!</p>
          </div>
        )}

        {/* ARTICLES TABLE */}
        <div className="container pb-5">
          <h3 className="mb-3">Mavjud Nashrlar</h3>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>№</th>
                    <th>Betlari</th>
                    <th>Kodi</th>
                    <th>Kvartal</th>
                    <th>MuallifTanlov</th>
                    <th>Mualliflar</th>
                    <th>MualliflarSoni</th>
                    <th>Nashr</th>
                    <th>Nashrda</th>
                    <th>Nashriyot</th>
                    <th>Nomi</th>
                    <th>ProektShifri</th>
                    <th>SDB</th>
                    <th>Shahri</th>
                    <th>UquvYili</th>
                    <th>Yili</th>
                    <th>createdAt</th>
                    <th>kiritVaqt</th>
                  </tr>
                </thead>
                <tbody>
                  {articlesData.map((article, index) => {
                    const {
                      id,
                      Betlari,
                      Kodi,
                      Kvartal,
                      MuallifTanlov,
                      Mualliflar,
                      MualliflarSoni,
                      Nashr,
                      Nashrda,
                      Nashriyot,
                      Nomi,
                      ProektShifri,
                      SDB,
                      Shahri,
                      UquvYili,
                      Yili,
                      createdAt,
                      kiritVaqt,
                    } = article;

                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{Betlari || ""}</td>
                        <td>{Kodi || ""}</td>
                        <td>{Kvartal || ""}</td>
                        <td>{MuallifTanlov || ""}</td>
                        <td>{Mualliflar || ""}</td>
                        <td>{MualliflarSoni || ""}</td>
                        <td>{Nashr || ""}</td>
                        <td>{Nashrda || ""}</td>
                        <td>{Nashriyot || ""}</td>
                        <td>{Nomi || ""}</td>
                        <td>{ProektShifri || ""}</td>
                        <td>{SDB || ""}</td>
                        <td>{Shahri || ""}</td>
                        <td>{UquvYili || ""}</td>
                        <td>{Yili || ""}</td>
                        <td>
                          {/* createdAt could be a Firestore Timestamp; handle accordingly */}
                          {createdAt
                            ? createdAt.toDate
                              ? createdAt.toDate().toLocaleString()
                              : createdAt.toString()
                            : ""}
                        </td>
                        <td>{kiritVaqt || ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Publications;
