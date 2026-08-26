import Link from "next/link";
import Image from "next/image";
import { Star, MessageSquare, ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMyReviews } from "../_actions/getMyReviews";

const MyReviewsPage = async () => {
  const result = await getMyReviews();
  const reviews = result?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Reviews</h1>
          <p className="text-sm text-muted-foreground">
            View all feedback and ratings you have shared for rented gear.
          </p>
        </div>

        <Link href="/dashboard/customer/orders">
          <Button variant="outline" size="sm" className="gap-2">
            View Completed Orders <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Submitted Reviews ({reviews.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-base">No reviews yet</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                You haven&apos;t reviewed any gear yet. Return a rented item to
                leave a review.
              </p>
              <Link href="/dashboard/customer/orders" className="mt-4">
                <Button size="sm">Go to Orders</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {reviews.map((rev: any) => (
                <div
                  key={rev.id}
                  className="flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-hover hover:border-primary/20"
                >
                  <div>
                    {/* Gear Info Header */}
                    <div className="flex items-center gap-3">
                      {rev.gearItem?.images?.[0] ? (
                        <Image
                          src={rev.gearItem.images[0]}
                          alt={rev.gearItem.title}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg object-cover border"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
                          GEAR
                        </div>
                      )}

                      <div className="overflow-hidden">
                        <p className="font-semibold text-sm truncate">
                          {rev.gearItem?.title || "Gear Item"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(rev.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Star Rating Display */}
                    <div className="mt-3 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= rev.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="ml-1.5 text-xs font-semibold text-foreground">
                        {rev.rating}.0
                      </span>
                    </div>

                    {/* Review Feedback Comment */}
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyReviewsPage;
