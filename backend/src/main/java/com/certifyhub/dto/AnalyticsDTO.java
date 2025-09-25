package com.certifyhub.dto;

import java.util.List;
import java.util.Map;

/**
 * DTOs for analytics data
 */
public class AnalyticsDTO {

    public static class CategoryStats {
        private String category;
        private long count;

        public CategoryStats() {
        }

        public CategoryStats(String category, long count) {
            this.category = category;
            this.count = count;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }

        public static CategoryStatsBuilder builder() {
            return new CategoryStatsBuilder();
        }

        public static class CategoryStatsBuilder {
            private CategoryStats stats = new CategoryStats();

            public CategoryStatsBuilder category(String category) {
                stats.setCategory(category);
                return this;
            }

            public CategoryStatsBuilder count(long count) {
                stats.setCount(count);
                return this;
            }

            public CategoryStats build() {
                return stats;
            }
        }
    }

    public static class IssuerStats {
        private String issuer;
        private long count;

        public IssuerStats() {
        }

        public IssuerStats(String issuer, long count) {
            this.issuer = issuer;
            this.count = count;
        }

        public String getIssuer() {
            return issuer;
        }

        public void setIssuer(String issuer) {
            this.issuer = issuer;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }

        public static IssuerStatsBuilder builder() {
            return new IssuerStatsBuilder();
        }

        public static class IssuerStatsBuilder {
            private IssuerStats stats = new IssuerStats();

            public IssuerStatsBuilder issuer(String issuer) {
                stats.setIssuer(issuer);
                return this;
            }

            public IssuerStatsBuilder count(long count) {
                stats.setCount(count);
                return this;
            }

            public IssuerStats build() {
                return stats;
            }
        }
    }

    public static class TimelineStats {
        private String period; // Format: "2024-01"
        private long count;

        public TimelineStats() {
        }

        public TimelineStats(String period, long count) {
            this.period = period;
            this.count = count;
        }

        public String getPeriod() {
            return period;
        }

        public void setPeriod(String period) {
            this.period = period;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }

        public static TimelineStatsBuilder builder() {
            return new TimelineStatsBuilder();
        }

        public static class TimelineStatsBuilder {
            private TimelineStats stats = new TimelineStats();

            public TimelineStatsBuilder period(String period) {
                stats.setPeriod(period);
                return this;
            }

            public TimelineStatsBuilder count(long count) {
                stats.setCount(count);
                return this;
            }

            public TimelineStats build() {
                return stats;
            }
        }
    }

    public static class UnitStats {
        private String unit;
        private long count;
        private double percentage;

        public UnitStats() {
        }

        public UnitStats(String unit, long count, double percentage) {
            this.unit = unit;
            this.count = count;
            this.percentage = percentage;
        }

        public String getUnit() {
            return unit;
        }

        public void setUnit(String unit) {
            this.unit = unit;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }

        public double getPercentage() {
            return percentage;
        }

        public void setPercentage(double percentage) {
            this.percentage = percentage;
        }

        public static UnitStatsBuilder builder() {
            return new UnitStatsBuilder();
        }

        public static class UnitStatsBuilder {
            private UnitStats stats = new UnitStats();

            public UnitStatsBuilder unit(String unit) {
                stats.setUnit(unit);
                return this;
            }

            public UnitStatsBuilder count(long count) {
                stats.setCount(count);
                return this;
            }

            public UnitStatsBuilder percentage(double percentage) {
                stats.setPercentage(percentage);
                return this;
            }

            public UnitStats build() {
                return stats;
            }
        }
    }

    public static class OverviewStats {
        private long totalCertificates;
        private long totalUsers;
        private long totalCategories;
        private long totalIssuers;
        private double averageCertificatesPerUser;
        private List<CategoryStats> topCategories;
        private List<IssuerStats> topIssuers;

        public OverviewStats() {
        }

        public OverviewStats(long totalCertificates, long totalUsers, long totalCategories, long totalIssuers) {
            this.totalCertificates = totalCertificates;
            this.totalUsers = totalUsers;
            this.totalCategories = totalCategories;
            this.totalIssuers = totalIssuers;
        }

        public long getTotalCertificates() {
            return totalCertificates;
        }

        public void setTotalCertificates(long totalCertificates) {
            this.totalCertificates = totalCertificates;
        }

        public long getTotalUsers() {
            return totalUsers;
        }

        public void setTotalUsers(long totalUsers) {
            this.totalUsers = totalUsers;
        }

        public long getTotalCategories() {
            return totalCategories;
        }

        public void setTotalCategories(long totalCategories) {
            this.totalCategories = totalCategories;
        }

        public long getTotalIssuers() {
            return totalIssuers;
        }

        public void setTotalIssuers(long totalIssuers) {
            this.totalIssuers = totalIssuers;
        }

        public double getAverageCertificatesPerUser() {
            return averageCertificatesPerUser;
        }

        public void setAverageCertificatesPerUser(double averageCertificatesPerUser) {
            this.averageCertificatesPerUser = averageCertificatesPerUser;
        }

        public List<CategoryStats> getTopCategories() {
            return topCategories;
        }

        public void setTopCategories(List<CategoryStats> topCategories) {
            this.topCategories = topCategories;
        }

        public List<IssuerStats> getTopIssuers() {
            return topIssuers;
        }

        public void setTopIssuers(List<IssuerStats> topIssuers) {
            this.topIssuers = topIssuers;
        }

        public static OverviewStatsBuilder builder() {
            return new OverviewStatsBuilder();
        }

        public static class OverviewStatsBuilder {
            private OverviewStats stats = new OverviewStats();

            public OverviewStatsBuilder totalCertificates(long totalCertificates) {
                stats.setTotalCertificates(totalCertificates);
                return this;
            }

            public OverviewStatsBuilder totalUsers(long totalUsers) {
                stats.setTotalUsers(totalUsers);
                return this;
            }

            public OverviewStatsBuilder totalCategories(long totalCategories) {
                stats.setTotalCategories(totalCategories);
                return this;
            }

            public OverviewStatsBuilder totalIssuers(long totalIssuers) {
                stats.setTotalIssuers(totalIssuers);
                return this;
            }

            public OverviewStatsBuilder averageCertificatesPerUser(double averageCertificatesPerUser) {
                stats.setAverageCertificatesPerUser(averageCertificatesPerUser);
                return this;
            }

            public OverviewStatsBuilder topCategories(List<CategoryStats> topCategories) {
                stats.setTopCategories(topCategories);
                return this;
            }

            public OverviewStatsBuilder topIssuers(List<IssuerStats> topIssuers) {
                stats.setTopIssuers(topIssuers);
                return this;
            }

            public OverviewStats build() {
                return stats;
            }
        }
    }
}